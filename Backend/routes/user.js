import express from "express";
import Shop from "../models/Shop.js";
import Medicine from "../models/Medicine.js";

const router = express.Router();

// 🔍 Search medicine + nearest shops
router.get("/search", async (req, res) => {
  const { name, lat, lng } = req.query;

  const shops = await Shop.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 5000
      }
    }
  });

  const shopIds = shops.map(s => s._id);

  const medicines = await Medicine.find({
    name: { $regex: name, $options: "i" },
    shopId: { $in: shopIds }
  }).populate("shopId");

  res.json(medicines);
});

export default router;
