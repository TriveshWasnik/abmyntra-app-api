import mongoose from "mongoose";
export async function connectDB() {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI)
        if (res) {
            console.log(`Database Connected! host:${res.connection.host} `)
        }
    } catch (error) {
        console.log(error)
    }
}