import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/school_db";
const client = new MongoClient(connectionString);

let dbConnection;

async function connectToDatabase() {
    try {
        const conn = await client.connect();
        dbConnection = conn.db("school_db");
        console.log("Successfully connected to MongoDB.");
        return dbConnection;
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        process.exit(1);
    }
}

export default async function getDb() {
    if (!dbConnection) {
        dbConnection = await connectToDatabase();
    }
    return dbConnection;
}