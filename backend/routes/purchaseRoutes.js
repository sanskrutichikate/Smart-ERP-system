import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const {
      supplier_name,
      invoice_no,
      item_name,
      quantity,
      rate,
      amount,
      payment_type,
      date,
    } = req.body;

    await pool.query(
      `INSERT INTO purchases
      (supplier_name, invoice_no, item_name, quantity, rate, amount, payment_type, date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        supplier_name,
        invoice_no,
        item_name,
        quantity,
        rate,
        amount,
        payment_type,
        date,
      ]
    );

    res.json({ message: "Purchase saved successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;