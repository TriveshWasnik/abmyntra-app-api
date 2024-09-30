import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: {
        type: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 }
        }], default: []
    },
    favourites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        default: []
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Order",
        default: []
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);