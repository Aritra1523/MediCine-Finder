import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true
  },
 phone: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }

}, { timestamps: true });

shopSchema.index({ location: "2dsphere" });

export default mongoose.model("Shop", shopSchema);
