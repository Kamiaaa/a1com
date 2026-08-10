// app/api/subscriptions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Subscription from '@/models/Subscription';
import Package from '@/models/Package';

export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, phone, email, address, selectedPackage } = body;

    // 1. Validation check
    if (!name || !phone || !email || !address || !selectedPackage) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please fill out all required fields.',
        },
        { status: 400 }
      );
    }

    
    const packageExists = await Package.findById(selectedPackage);
    if (!packageExists) {
      return NextResponse.json(
        {
          success: false,
          error: 'Selected package is invalid or no longer exists.',
        },
        { status: 404 }
      );
    }

    // 3. New subscription request save করা
    const newSubscription = await Subscription.create({
      name,
      phone,
      email,
      address,
      selectedPackage,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription request received successfully!',
        data: {
          _id: newSubscription._id.toString(),
          name: newSubscription.name,
          email: newSubscription.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit request.',
      },
      { status: 500 }
    );
  }
}

// GET - Admin dashboard-এ সব subscription requests দেখার জন্য
export async function GET() {
  try {
    await dbConnect();

    // Package schema connect করে package details সহ ডাটা আনা
    const subscriptions = await Subscription.find({})
      .populate('selectedPackage', 'name speed price')
      .sort({ createdAt: -1 })
      .lean();

    const serialized = subscriptions.map((sub: any) => ({
      ...sub,
      _id: sub._id.toString(),
      selectedPackage: sub.selectedPackage
        ? { ...sub.selectedPackage, _id: sub.selectedPackage._id.toString() }
        : null,
      createdAt: sub.createdAt ? sub.createdAt.toISOString() : undefined,
    }));

    return NextResponse.json(
      {
        success: true,
        data: serialized,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch subscriptions.',
      },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Subscription ID and status are required' },
        { status: 400 }
      );
    }

    const updatedSub = await Subscription.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('selectedPackage', 'name speed price').lean();

    if (!updatedSub) {
      return NextResponse.json(
        { success: false, error: 'Subscription request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...updatedSub,
        _id: updatedSub._id.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update status' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a subscription request
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    await Subscription.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Subscription deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete subscription' },
      { status: 500 }
    );
  }
}