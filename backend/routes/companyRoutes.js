import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Add company
router.post("/add", async (req, res) => {
  try {
    const { name, email, phone, address, gstNumber } = req.body;

    const result = await pool.query(
      `INSERT INTO companies (name, email, phone, address, gst_number)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, phone, address, gstNumber]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding company" });
  }
});

// Get all companies
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM companies ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching companies" });
  }
});

export default router;