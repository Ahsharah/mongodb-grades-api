import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/school_db";

let db;

async function connectToDatabase() {
    try {
        const client = new MongoClient(connectionString);
        await client.connect();
        console.log("Successfully connected to MongoDB.");
        
        db = client.db("school_db");
        return db;
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
        process.exit(1);
    }
}

// Initialize connection
connectToDatabase();

export default function getDb() {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db;
}