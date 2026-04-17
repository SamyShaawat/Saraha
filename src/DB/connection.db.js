import mongoose from "mongoose"
import { DB_URI } from "../../config/config.service.js"
import { UserModel } from "./models/index.js";



export const authenticationDB = async () => {
    try {
        const databaseConnectionResult = await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000 })
        // console.log(databaseConnectionResult);
        console.log("DB connected Successfully🚀🚀");
        await UserModel.syncIndexes();
    } catch (error) {
        console.log("Failed to connect 😒", error.message);
    }
}
