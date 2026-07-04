import express from "express";
import pool from "../config/db.js";

const router = express.Router();


// CREATE BILL
router.post("/add", async (req, res) => {
  try {
    const {
      invoice_no,
      customer_id,
      subtotal,
      gst,
      grand_total,
      bill_date,
      items
    } = req.body;

    // Step 1: Insert into bills table
    const billResult = await pool.query(
      `INSERT INTO bills 
      (invoice_no, customer_id, subtotal, gst, grand_total, bill_date)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id`,
      [
        invoice_no,
        customer_id,
        subtotal,
        gst,
        grand_total,
        bill_date
      ]
    );

    const billId = billResult.rows[0].id;

    // Step 2: Loop through bill items
    for (const item of items) {
      const { item_id, qty, rate, amount } = item;

      // Check item exists
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

      // Check stock
      if (currentStock < qty) {
        return res.status(400).json({
          message: `Insufficient stock for item ID ${item_id}`
        });
      }

      // Insert into bill_items
      await pool.query(
        `INSERT INTO bill_items
        (bill_id, item_id, qty, rate, amount)
        VALUES ($1,$2,$3,$4,$5)`,
        [billId, item_id, qty, rate, amount]
      );

      // Reduce stock
      await pool.query(
        "UPDATE items SET quantity = quantity - $1 WHERE id = $2",
        [qty, item_id]
      );
    }

    res.status(201).json({
      message: "Bill created successfully"
    });

  } catch (error) {
    console.log("Billing Error:", error.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// GET ALL BILLS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        bills.*,
        customers.name AS customer_name
      FROM bills
      JOIN customers ON bills.customer_id = customers.id
      ORDER BY bills.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// GET SINGLE BILL WITH ITEMS
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const billResult = await pool.query(
      `SELECT * FROM bills WHERE id = $1`,
      [id]
    );

    const itemsResult = await pool.query(
      `SELECT 
        bill_items.*,
        items.item_name
      FROM bill_items
      JOIN items ON bill_items.item_id = items.id
      WHERE bill_id = $1`,
      [id]
    );

    res.json({
      bill: billResult.rows[0],
      items: itemsResult.rows
    });

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

export default router;