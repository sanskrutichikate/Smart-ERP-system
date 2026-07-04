import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Add supplier
router.post("/add", async (req, res) => {
  try {
    const { name, phone, email, address, gstNumber } = req.body;

    const result = await pool.query(
      `INSERT INTO suppliers
      (name, phone, email, address, gst_number)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [name, phone, email, address, gstNumber]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding supplier" });
  }
});

// Get all suppliers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM suppliers ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching suppliers" });
  }
});

export default router;