import mongoose from 'mongoose';

const SavedTripSchema = new mongoose.Schema({
  destinationId: { type: String, required: true },
  destinationName: { type: String, required: true },
  duration: { type: Number, required: true },
  budgetTier: { type: String, required: true },
  transportMode: { type: String, required: true },
  totalCost: { type: Number, required: true },
  customActivities: [{
    id: { type: Number },
    text: { type: String }
  }],
  favorites: [{
    id: { type: String },
    name: { type: String },
    category: { type: String },
    cost: { type: Number }
  }],
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  savedTrips: [SavedTripSchema]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
