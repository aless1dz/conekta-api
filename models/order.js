const { pool } = require("../config/db");
const conekta = require("../config/conektaConfig");

const createOrder = async (customer_id, items, total_price) => {
  try {
    const [customer] = await pool.query(
      "SELECT conekta_customer_id FROM customers WHERE id = ?",
      [customer_id]
    );

    if (customer.length === 0) {
      throw new Error("Cliente no encontrado");
    }

    const conekta_customer_id = customer[0].conekta_customer_id;

    const order = await conekta.Order.create({
      currency: "MXN",
      customer_info: {
        customer_id: conekta_customer_id,
      },
      line_items: items.map((item) => ({
        name: item.name,
        unit_price: item.price * 100, 
        quantity: item.quantity,
      })),
      charges: [
        {
          payment_method: {
            type: "default",
          },
        },
      ],
    });

    const [result] = await pool.query(
      "INSERT INTO orders (customer_id, conekta_order_id, total_price) VALUES (?, ?, ?)",
      [customer_id, order.id, total_price]
    );

    return {
      id: result.insertId,
      conekta_order_id: order.id,
      total_price,
      status: order.payment_status,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { createOrder };
