import mongoose from "mongoose";
import env from 'dotenv';

env.config()


const dbUsername = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const cluster = process.env.DB_CLUSTER || "";
const dbName = process.env.DB_NAME || "";

const dbCloud = `mongodb+srv://${dbUsername}:${dbPassword}@${cluster}/${dbName}?retryWrites=true&w=majority`;


const local = "mongodb://localhost:27017/Cyno";


export const ConnectToDb = async () => {
  try {
    const db = await mongoose.connect(dbCloud);
    if (db) {
      console.log("DB connected successfully");
    }else{
        console.log("DB not found")
    }
  } catch (err) {
    console.error(err);
  }
};
