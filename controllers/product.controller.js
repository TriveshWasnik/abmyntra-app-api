import mongoose from "mongoose";
import { Product } from "../models/product.model.js";

// add product controllers
export async function addProducts(req, res) {
    try {
        const productsData = req.body;

        if (!Array.isArray(productsData)) {
            return res.status(400).json({ message: "Invalid request. Expected an array of products", success: false });
        }

        const createdproducts = [];

        for (const productInfo of productsData) {
            const { title, name, desc, img, price, sizes, colors, category } = productInfo;

            const product = new Product({
                title,
                name,
                desc,
                img,
                price,
                sizes,
                colors,
                category,
            });
            const createdproduct = await product.save();

            createdproducts.push(createdproduct);
        }

        return res
            .status(201)
            .json({ message: "Products added successfully", createdproducts, success: true });
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in Add Product API", success: false, error })
    }
}

// get all products controller

export async function getProducts(req, res) {
    try {
        let { categories, minPrice, maxPrice, sizes, colors, search } = req.query;
        sizes = sizes?.split(",");
        colors = colors?.split(",");
        categories = categories?.split(",");

        const filter = {};

        if (minPrice || maxPrice) {
            filter["price.org"] = {};
            if (minPrice) {
                filter["price.org"]["$gte"] = parseFloat(minPrice);
            }
            if (maxPrice) {
                filter["price.org"]["$lte"] = parseFloat(maxPrice);
            }
        }

        if (sizes && Array.isArray(sizes)) {
            filter.sizes = { $in: sizes }; // Match products in any of the specified sizes
        }

        if (colors && Array.isArray(colors)) {
            filter.colors = { $in: colors }; // Match products in any of the specified sizes
        }
        if (categories && Array.isArray(categories)) {
            filter.category = { $in: categories };
        }

        if (search) {
            filter.$or = [
                { title: { $regex: new RegExp(search, "i") } }, // Case-insensitive title search
                { desc: { $regex: new RegExp(search, "i") } }, // Case-insensitive description search
            ];
        }

        const products = await Product.find(filter);
        return res.status(200).json({ products, success: true });

    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in get All Products API", success: false, error })

    }
}


// single product controller

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid product ID", success: false });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({ message: "Product not found", success: false });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(509).json({ message: "Error in get single Products API", success: false, error })

    }
};
