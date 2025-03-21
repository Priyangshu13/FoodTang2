import mongoose from "mongoose";

const uri = "mongodb+srv://priyangshu13:PRIY4ngshu%4013@cluster0.i96jc.mongodb.net/FoodTang2?retryWrites=true&w=majority";

export const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error.message);

        // Exit only after a few retries (optional)
        process.exit(1);
    }
};
