const { pool } = require("../config/db");
const conekta = require("../config/conektaConfig");

const createCustomer = async (name, email, phone, token_id) => {
  try {
    const conektaCustomer = await conekta.Customer.create({
      name,
      email,
      phone,
      payment_sources: [
        {
          type: "card",
          token_id, 
        },
      ],
    });

    const [result] = await pool.query(
      "INSERT INTO customers (name, email, phone, conekta_customer_id) VALUES (?, ?, ?, ?)",
      [name, email, phone, conektaCustomer.id]
    );

    return {
      id: result.insertId,
      name,
      email,
      phone,
      conekta_customer_id: conektaCustomer.id,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { createCustomer };
