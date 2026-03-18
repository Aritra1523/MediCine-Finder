import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true
  },
  unit: {
    type: String,
    enum: ["tablet", "strip","syrup","bottle"],
    // required:true
     default: "tablet"
  },
  unitQty: {
    type: Number,
    default: 1 // strip = 10 tablets
  }
});

export default mongoose.model("Medicine", medicineSchema);
