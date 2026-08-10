// models/Subscription.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  name: string;
  phone: string;
  email: string;
  address: string;
  selectedPackage: mongoose.Types.ObjectId;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: Date;
}

const SubscriptionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    address: { type: String, required: true, trim: true },
    selectedPackage: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', SubscriptionSchema);