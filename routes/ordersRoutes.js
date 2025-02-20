const express = require("express");
const { createOrder } = require("../models/order");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { customer_id, items, total_price } = req.body;

    if (!customer_id || !items || !total_price) {
      return res.status(400).json({ error: "Faltan datos de la orden" });
    }

    const order = await createOrder(customer_id, items, total_price);
    res.status(201).json({ message: "Pago realizado con éxito", order });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar el pago", details: error.message });
  }
});

module.exports = router;
