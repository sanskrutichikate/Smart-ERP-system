import express from "express";
import pool from "../config/db.js";

const router = express.Router();


// Add Customer
router.post("/add", async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const result = await pool.query(
      "INSERT INTO customers (name, phone, address) VALUES ($1,$2,$3) RETURNING *",
      [name, phone, address]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// Get All Customers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

export default router;