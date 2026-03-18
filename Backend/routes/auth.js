import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Shop from "../models/Shop.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, phone, lat, lng } = req.body;

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      phone
    });

    // 🔥 AUTO CREATE SHOP FOR PHARMACIST
    if (role === "pharmacist") {
      await Shop.create({
        shopName: `${name}'s Medical Store`,
        phone,
        owner: user._id,
        location: {
          type: "Point",
          coordinates: [
            lng || 88.3639,  // fallback
            lat || 22.5726
          ]
        }
      });
    }

    res.status(201).json({ msg: "Registered successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Registration failed" });
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 FIND SHOP IF PHARMACIST
    let shopId = null;
    if (user.role === "pharmacist") {
      const shop = await Shop.findOne({ owner: user._id });
      shopId = shop ? shop._id : null;
    }

    // ✅ SEND ONLY ONE RESPONSE
    res.json({
      token,
      role: user.role,
      shopId
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login failed" });
  }
});


export default router;
