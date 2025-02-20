const db = require("../config/db");

class Product {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  }
}

module.exports = Product;
