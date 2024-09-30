import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { products, address, totalAmount } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);
        const order = new Order({
            products,
            user: user._id,
            total_amount: totalAmount,
            address,
        });
        await order.save();

        user.cart.save();

        user.cart = [];
        await user.save();

        return res
            .status(200)
            .json({ message: "Order placed successfully", order, success: true });
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in create Order API", success: false, error })

    }
};

export const getAllOrders = async (req, res) => {
    try {
        const user = req.user;
        const orders = await Order.find({ user: user.id });
        return res.status(200).json({ orders, success: true });
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in get all Orders API", success: false, error })
    }
};