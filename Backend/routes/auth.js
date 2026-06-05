import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Shop from "../models/Shop.js";
import verifyToken from "../middleware/authMiddleware.js"
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
      shopId,
      name: user.name
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login failed" });
  }
});

// UPDATE PROFILE
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // ✅ Update only if field is NOT empty
    if (name && name.trim() !== "") {
      user.name = name;
    }

    if (email && email.trim() !== "") {
      // 🔥 check duplicate email
      if (email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ msg: "Email already exists" });
        }
      }
      user.email = email;
    }

    if (phone && phone.trim() !== "") {
      user.phone = phone;
    }

    // ✅ Password update (optional)
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      msg: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


export default router;
