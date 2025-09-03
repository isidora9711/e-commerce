import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Import User model (θα το φτιάξουμε αμέσως μετά)
import User from "./User.js";

const app = express();
app.use(cors());
app.use(express.json());

// Σύνδεση με MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Signup route
app.post("/api/signup", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, isAdmin });
    await user.save();
    res.status(201).json({ message: "Ο χρήστης δημιουργήθηκε!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Λανθασμένο email!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Λανθασμένος κωδικός!" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "secretkey", // Φύλαξε το σε .env για production
      { expiresIn: "1d" }
    );

    res.json({ token, isAdmin: user.isAdmin, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
