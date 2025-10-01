import mongoose from "mongoose";

const connect_db = async () => {
    try{
        await mongoose.connect("mongodb+srv://alwinsnthsh:Alwin123456.@cluster0.5r1n20a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("connected to database");
    }catch(error){
        console.error("Error connecting to db",error);
        process.exit(1);
        
    }
}
export default connect_db;