import mongoose from "mongoose";
const connectDB= async(DATABASE_URL)=>{
    try{
        const DB_OPTIONS={
            // user:'prem',
            // pass:'prem',
            dbName: 'loc',
            // authSource:'schooldb'
        }
        await mongoose.connect(DATABASE_URL ,DB_OPTIONS);
        console.log('Connected Successfully..');
    }
    catch(err){
        console.log(err)
        console.log("error")
    }
}
export default connectDB
