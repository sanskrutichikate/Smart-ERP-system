import express from "express";
import pool from "../config/db.js";

const router = express.Router();


// Add Item
router.post("/", async (req, res) => {
  try {
    const { item_name, quantity, price, unit } = req.body;

    const result = await pool.query(
      `INSERT INTO items (item_name, quantity, price, unit)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [item_name, quantity, price, unit]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding item" });
  }
});


// Get All Items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching items" });
  }
});

export default router;