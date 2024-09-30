import jwt from "jsonwebtoken";


export const verifyToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "User not authenticated", success: false });
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return next(createError(401, "You are not authenticated!"));
        const decode = jwt.verify(token, process.env.JWT);
        req.user = decode;
        return next();
    } catch (error) {
        console.log(error);
    }
};