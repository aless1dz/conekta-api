const express = require("express");
const { processPayment } = require("../models/payment");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { customer, orderDetails } = req.body;

    if (!customer || !orderDetails) {
      return res.status(400).json({ error: "Faltan datos del cliente o la orden" });
    }

    const paymentResult = await processPayment(customer, orderDetails);

    if (paymentResult.success) {
      res.status(201).json({ message: "Pago exitoso", order: paymentResult.order });
    } else {
      res.status(400).json({ error: paymentResult.message });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
});

module.exports = router;
