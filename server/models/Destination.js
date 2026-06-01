import mongoose from 'mongoose';

const RouteDetailSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  details: { type: String, default: '' }
}, { _id: false });

const ConnectionSchema = new mongoose.Schema({
  flight: { type: RouteDetailSchema },
  train: { type: RouteDetailSchema },
  bus: { type: RouteDetailSchema },
  cab: { type: RouteDetailSchema }
}, { _id: false });

const HotelDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  highlights: [{ type: String }]
}, { _id: false });

const DiningDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  type: { type: String, required: true },
  cost: { type: Number, required: true }
}, { _id: false });

const AttractionDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  entryFee: { type: Number, default: 0 },
  duration: { type: Number, required: true },
  description: { type: String, required: true }
}, { _id: false });

const AdventureDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  type: { type: String, required: true },
  thrillLevel: { type: String, required: true }
}, { _id: false });

const DestinationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  tagline: { type: String, default: '' },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  climate: { type: String, required: true },
  bestTime: { type: String, required: true },
  routes: {
    delhi: { type: ConnectionSchema },
    mumbai: { type: ConnectionSchema },
    bengaluru: { type: ConnectionSchema },
    kolkata: { type: ConnectionSchema }
  },
  hotels: {
    budget: { type: HotelDetailSchema },
    midRange: { type: HotelDetailSchema },
    luxury: { type: HotelDetailSchema }
  },
  dining: [DiningDetailSchema],
  attractions: [AttractionDetailSchema],
  adventures: [AdventureDetailSchema]
}, { timestamps: true });

export default mongoose.model('Destination', DestinationSchema);
