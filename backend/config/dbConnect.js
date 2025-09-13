import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected Successfully");                
    } catch (error) {
        console.log(`Error ${error.message}`);
        process.exit(1)
    }
}