import express from "express";
import Medicine from "../models/Medicine.js";
import Shop from "../models/Shop.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= USER ROUTES ================= */

// 🔍 Search medicine
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    let medicines;

    // 🔹 IF NO SEARCH → LOAD ALL (LIMITED)
    if (!q) {
      medicines = await Medicine.find()
        .populate("shopId", "shopName phone")
        .sort({ price: 1 })
        .limit(50); // 🔥 important (performance)
    } else {
      medicines = await Medicine.find({
        name: { $regex: q, $options: "i" },
      })
        .populate("shopId", "shopName phone")
        .sort({ price: 1 });
    }

    const grouped = {};

    medicines.forEach((med) => {
      if (!med.shopId) return;

      const shopId = med.shopId._id.toString();

      if (!grouped[shopId]) {
        grouped[shopId] = {
          shopId,
          shopName: med.shopId.shopName,
          phone: med.shopId.phone,
          medicines: [],
        };
      }

      grouped[shopId].medicines.push({
        _id: med._id,
        name: med.name,
        price: med.price,
        stock: med.stock,
        unit: med.unit || "tablet",      // ✅ IMPORTANT
        unitQty: med.unitQty || 1,        // ✅ IMPORTANT
      });
    });

    res.json(Object.values(grouped));
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ msg: "Search failed" });
  }
});


// ✏️ Update medicine
router.put("/update/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const updated = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});


// ❌ Delete medicine
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Access denied" });
    }

    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ msg: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
});



// 🏪 Get shop medicines
router.get("/shop/:id", async (req, res) => {
  try {
    const meds = await Medicine.find({ shopId: req.params.id });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ msg: "Failed to load medicines" });
  }
});

/* ================= PHARMACIST ROUTES ================= */

// ➕ Add medicine (PHARMACIST ONLY)
router.post("/add", auth, async (req, res) => {
  try {
    // 🔐 role check
    if (req.user.role !== "pharmacist") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { name, price, stock, unit, unitQty, } = req.body;
    console.log("BACKEND BODY:", req.body);

    if (!name || !price || !stock || !unit) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // 🏪 find pharmacist shop
    const shop = await Shop.findOne({ owner: req.user.id });

    if (!shop) {
      return res.status(404).json({ msg: "Shop not found" });
    }

    const medicine = await Medicine.create({
      name,
      price,
      stock,
      shopId: shop._id,
      unit,          // ✅ MUST BE HERE
      unitQty: unitQty || 1,
      // ✅ CORRECT
    });

    res.status(201).json(medicine);
  } catch (err) {
    console.error("ADD MEDICINE ERROR:", err);
    res.status(500).json({ msg: "Failed to add medicine" });
  }


});

// 📋 Get my medicines
router.get("/my", auth, async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.user.id });
    if (!shop) return res.json([]);

    const meds = await Medicine.find({ shopId: shop._id });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch medicines" });
  }
});

export default router;
