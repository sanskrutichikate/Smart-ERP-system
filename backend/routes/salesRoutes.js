import express from "express";
import pool from "../config/db.js";

const router = express.Router();


// CREATE SALES VOUCHER
router.post("/add", async (req, res) => {
  try {
    const {
      voucher_no,
      customer_id,
      item_id,
      qty,
      rate,
      amount,
      sale_date
    } = req.body;

    // Check if item exists
    const itemResult = await pool.query(
      "SELECT * FROM items WHERE id = $1",
      [item_id]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({
        message: "Item not found"
      });
    }
const currentStock = itemResult.rows[0].quantity;

    // Check stock availability
    if (currentStock < qty) {
      return res.status(400).json({
        message: "Insufficient stock"
      });
    }

    // Insert sale
    await pool.query(
      `INSERT INTO sales
      (voucher_no, customer_id, item_id, qty, rate, amount, sale_date)
      VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        voucher_no,
        customer_id,
        item_id,
        qty,
        rate,
        amount,
        sale_date
      ]
    );

    // Reduce stock
 await pool.query(
  "UPDATE items SET quantity = quantity - $1 WHERE id = $2",
  [qty, item_id]
);

    res.status(201).json({
      message: "Sales voucher created successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});


// GET ALL SALES
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        sales.*,
        customers.name AS customer_name,
        items.item_name
      FROM sales
      JOIN customers ON sales.customer_id = customers.id
      JOIN items ON sales.item_id = items.id
      ORDER BY sales.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});


// GET SINGLE SALE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM sales WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Sale not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
  console.log("Sales Error:", error.message);
    console.log(error.stack);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

export default router;