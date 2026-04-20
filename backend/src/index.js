import dotenv from "dotenv"
import connectMongoDB from "./config/database.js";
import app from "./app.js"

dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        await connectMongoDB();
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Log: Server is running at port : ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.log("MONGO db connection failed !!! ", error);
    }
}

startServer();