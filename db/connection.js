import mongoose from "mongoose";
import { MONGO_URL } from "../config/config.js";

export const connection=()=>{mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('db connected succesfully');
}).catch((error)=>{
    console.error(error);
})};