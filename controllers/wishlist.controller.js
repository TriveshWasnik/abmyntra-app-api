import { User } from "../models/user.model.js";

export const addToFavorites = async (req, res) => {
    try {
        const { productId } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);

        if (!user.favourites.includes(productId)) {
            user.favourites.push(productId);
            await user.save();
        }

        return res
            .status(200)
            .json({ message: "Product added to favorites successfully", user, success: true });
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in add to favourite API", success: false, error })

    }
};

export const removeFromFavorites = async (req, res) => {
    try {
        const { productId } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);

        user.favourites = user.favourites.filter((fav) => !fav.equals(productId));
        await user.save();
        return res
            .status(200)
            .json({ message: "Product removed from favorites successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in remove from favourite API", success: false, error })

    }
};

export const getUserFavourites = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("favourites").exec();

        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        return res.status(200).json(user.favourites);
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in get Favourites API", success: false, error })

    }
};