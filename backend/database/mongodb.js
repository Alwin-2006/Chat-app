import mongoose from "mongoose";

const connect_db = async () => {
    try{
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        await mongoose.connect(mongoUri);
        console.log("connected to database");
    }catch(error){
        console.error("Error connecting to db",error);
        process.exit(1);
        
    }
}
export default connect_db;