import mongoose from "mongoose";

const connectMongoDB = async () => {
    try{
         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
         console.log(connectionInstance.connection.host);
         
    }catch(error){
        console.log("Mongoose Connection failed" , error);
        process.exit(1);

    }
}

export default connectMongoDB