import { User } from "../models/user.model.js";

// add to cart
export async function addToCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);
        const existingCartItemIndex = user.cart.findIndex((item) =>
            item?.product?.equals(productId)
        );
        if (existingCartItemIndex !== -1) {
            // Product is already in the cart, update the quantity
            user.cart[existingCartItemIndex].quantity += quantity;
        } else {
            // Product is not in the cart, add it
            user.cart.push({ product: productId, quantity });
        }
        await user.save();

        return res
            .status(200)
            .json({ message: "Product added to cart successfully", user, success: true });
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in add to cart API", success: false, error })
    }
}

// remove from cart
export async function removeFromCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);
        if (!user) {
            return res
                .status(400)
                .json({ message: "User Not Found", success: false });
        }
        const productIndex = user.cart.findIndex((item) =>
            item.product.equals(productId)
        );
        if (productIndex !== -1) {
            if (quantity && quantity > 0) {
                user.cart[productIndex].quantity -= quantity;
                if (user.cart[productIndex].quantity <= 0) {
                    user.cart.splice(productIndex, 1);
                }
            } else {
                user.cart.splice(productIndex, 1);
            }

            await user.save();
            return res
                .status(200)
                .json({ message: "Product quantity updated in cart", user, success: true });
        } else {
            return res
                .status(400)
                .json({ message: "Product not found in the user's cart", success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in remove from cart API", success: false, error })
    }
};

// get all cart Items

export async function getAllCartItems(req, res) {
    try {
        const userJWT = req.user;
        const user = await User.findById(userJWT.id).populate({
            path: "cart.product",
            model: "Product",
        });
        const cartItems = user.cart;
        return res.status(200).json({ cartItems, success: true });
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in get all cart Items API", success: false, error })
    }
};

