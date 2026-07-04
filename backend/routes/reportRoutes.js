import express from "express";
import pool from "../config/db.js";

const router = express.Router();


// =============================
// SALES REPORT
// =============================
router.get("/sales", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.voucher_no,
        c.name AS customer_name,
        i.item_name,
        s.qty,
        s.rate,
        s.amount,
       s.sale_date
      FROM sales s
      JOIN customers c ON s.customer_id = c.id
      JOIN items i ON s.item_id = i.id
      ORDER BY s.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


// =============================
// PURCHASE REPORT
// =============================
router.get("/purchase", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        supplier_name,
        invoice_no,
        item_name,
        quantity,
        rate,
        amount,
        payment_type,
        date
      FROM purchases
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


// =============================
// STOCK REPORT
// =============================
router.get("/stock", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        item_name,
        quantity,
        price,
        unit
      FROM items
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


// =============================
// BILLING REPORT
// =============================
router.get("/bills", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        b.id,
        b.invoice_no,
        c.name AS customer_name,
        b.subtotal,
        b.gst,
        b.grand_total,
        b.bill_date
      FROM bills b
      JOIN customers c ON b.customer_id = c.id
      ORDER BY b.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


// =============================
// PROFIT REPORT
// =============================
router.get("/profit", async (req, res) => {
  try {
    const salesResult = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total_sales
      FROM sales
    `);

    const purchaseResult = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total_purchase
      FROM purchases
    `);

    const totalSales = Number(salesResult.rows[0].total_sales);
    const totalPurchase = Number(purchaseResult.rows[0].total_purchase);

    const profit = totalSales - totalPurchase;

    res.json({
      totalSales,
      totalPurchase,
      profit
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;