import express from "express";
import auth from "../middleware/authMiddleware.js";
import Shop from "../models/Shop.js";
import Medicine from "../models/Medicine.js";

const router = express.Router();

/* ================= SHOP ================= */

// Create shop (only once per pharmacist)
router.post("/shop", auth, async (req, res) => {
  try {
    if (req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const existing = await Shop.findOne({ owner: req.user.id });
    if (existing) {
      return res.status(400).json({ msg: "Shop already exists" });
    }

    const shop = await Shop.create({
      name: req.body.name,
      owner: req.user.id,
      location: req.body.location
    });

    res.status(201).json({
      msg: "Shop created",
      shopId: shop._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Shop creation failed" });
  }
});

/* ================= MEDICINE ================= */

// Add medicine
router.post("/medicine", auth, async (req, res) => {
  try {
    if (req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) {
      return res.status(400).json({ msg: "Shop not found" });
    }

    const medicine = await Medicine.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      shopId: shop._id,
      unit: req.body.unit || "tablet",      
      unitQty: req.body.unitQty || 1  
    });

    res.status(201).json(medicine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to add medicine" });
  }
});
// 



// Get my medicines
router.get("/my-medicines", auth, async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) return res.json([]);

    const meds = await Medicine.find({ shopId: shop._id });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load medicines" });
  }
});

export default router;
