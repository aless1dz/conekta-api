require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productsRoutes");
const orderRoutes = require("./routes/ordersRoutes");
const customersRoutes = require("./routes/customersRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/payments", paymentRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
