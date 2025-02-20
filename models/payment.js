const conekta = require("../config/conektaConfig");

const processPayment = async (customer, orderDetails) => {
    try {
      const order = await conekta.Order.create({
        currency: "MXN",
        customer_info: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
        line_items: orderDetails.map((item) => ({
          name: item.product_name,
          unit_price: item.price * 100, 
          quantity: item.quantity,
        })),
        charges: [
          {
            payment_method: {
              type: "card",
              token_id: customer.token_id, 
            },
          },
        ],
      });
  
      return { success: true, order };
    } catch (error) {
      return { success: false, message: error.details[0]?.message || "Error en el pago" };
    }
  };
  
  module.exports = { processPayment };