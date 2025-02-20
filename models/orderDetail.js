const db = require("../config/db");

class OrderDetail {
  static async add(orderId, productId, quantity, subtotal) {
    await db.query(
      "INSERT INTO orderDetails (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)",
      [orderId, productId, quantity, subtotal]
    );
  }
}

module.exports = OrderDetail;
