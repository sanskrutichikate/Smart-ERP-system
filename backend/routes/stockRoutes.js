import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// STOCK IN
router.post("/stock/in", async (req, res) => {
  try {
    const { item_id, quantity } = req.body;

    // Save transaction
    await pool.query(
      `INSERT INTO stock_transactions (item_id, type, quantity)
       VALUES ($1, 'IN', $2)`,
      [item_id, quantity]
    );

    // Increase stock
    await pool.query(
      `UPDATE items
       SET quantity = quantity + $1
       WHERE id = $2`,
      [quantity, item_id]
    );

    res.json({ message: "Stock added successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in stock IN" });
  }
});

// STOCK OUT
router.post("/stock/out", async (req, res) => {
  try {
    const { item_id, quantity } = req.body;

    // Check stock
    const item = await pool.query(
      "SELECT quantity FROM items WHERE id = $1",
      [item_id]
    );

    if (item.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.rows[0].quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // Save transaction
    await pool.query(
      `INSERT INTO stock_transactions (item_id, type, quantity)
       VALUES ($1, 'OUT', $2)`,
      [item_id, quantity]
    );

    // Reduce stock
    await pool.query(
      `UPDATE items
       SET quantity = quantity - $1
       WHERE id = $2`,
      [quantity, item_id]
    );

    res.json({ message: "Stock removed successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in stock OUT" });
  }
});

// STOCK REPORT
router.get("/stock/report", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM items ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching stock report" });
  }
});

export default router;