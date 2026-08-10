// app/api/packages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Package from '@/models/Package';

// Force dynamic behavior so Next.js doesn't cache stale DB data on build
export const dynamic = 'force-dynamic';

// GET - Fetch all packages
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const includeInactive = searchParams.get('includeInactive') === 'true';

    const query = includeInactive ? {} : { isActive: true };

    const packages = await Package.find(query)
      .sort({ displayOrder: 1, speedMbps: 1 })
      .lean();

    // Serialize MongoDB ObjectIds and Dates safely
    const serializedPackages = packages.map((pkg: any) => ({
      ...pkg,
      _id: pkg._id.toString(),
      createdAt: pkg.createdAt ? pkg.createdAt.toISOString() : undefined,
      updatedAt: pkg.updatedAt ? pkg.updatedAt.toISOString() : undefined,
    }));

    return NextResponse.json(
      {
        success: true,
        data: serializedPackages,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch packages',
      },
      { status: 500 }
    );
  }
}

// POST - Create a new package
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Auto-generate slug if missing
    if (!body.slug && body.name) {
      body.slug = body.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Validate required fields
    const requiredFields = [
      'name',
      'slug',
      'price',
      'speed',
      'speedMbps',
      'features',
      'icon',
      'color',
      'iconBg',
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Check if package with same name or slug already exists
    const existingPackage = await Package.findOne({
      $or: [{ name: body.name }, { slug: body.slug }],
    });

    if (existingPackage) {
      return NextResponse.json(
        {
          success: false,
          error: 'Package with this name or slug already exists',
        },
        { status: 409 }
      );
    }

    const newPackage = await Package.create(body);

    const serializedPackage = {
      ...newPackage.toObject(),
      _id: newPackage._id.toString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: serializedPackage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create package',
      },
      { status: 500 }
    );
  }
}

// PUT - Update multiple packages (bulk update)
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const packages = body.packages;

    if (!packages || !Array.isArray(packages)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid data format. Expected { packages: [] }',
        },
        { status: 400 }
      );
    }

    // Perform bulkWrite for optimal database execution instead of multiple sequential update queries
    const bulkOperations = packages.map((pkg: any) => {
      const { _id, __v, createdAt, ...updateData } = pkg;
      return {
        updateOne: {
          filter: { _id },
          update: { $set: { ...updateData, updatedAt: new Date() } },
        },
      };
    });

    if (bulkOperations.length > 0) {
      await Package.bulkWrite(bulkOperations);
    }

    // Retrieve refreshed dataset
    const updatedPackages = await Package.find({
      _id: { $in: packages.map((p: any) => p._id) },
    }).lean();

    const serializedUpdates = updatedPackages.map((pkg: any) => ({
      ...pkg,
      _id: pkg._id.toString(),
    }));

    return NextResponse.json(
      {
        success: true,
        data: serializedUpdates,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating packages:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update packages',
      },
      { status: 500 }
    );
  }
}