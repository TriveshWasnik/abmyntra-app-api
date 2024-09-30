import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`Server running at port ${PORT}`)
    connectDB();
})