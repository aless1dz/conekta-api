const express = require("express");
const { createCustomer } = require("../models/customer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, token_id } = req.body;

    if (!name || !email || !phone || !token_id) {
      return res.status(400).json({ error: "Faltan datos del cliente" });
    }

    const customer = await createCustomer(name, email, phone, token_id);
    res.status(201).json({ message: "Cliente registrado con éxito", customer });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar cliente", details: error.message });
  }
});

module.exports = router;
