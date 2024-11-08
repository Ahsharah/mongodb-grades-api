import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectionString = process.env.MONGODB_URI;

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
    console.log("Successfully connected to MongoDB.");
} catch(e) {
    console.error("Error connecting to MongoDB:", e);
}

const db = conn.db("school_db");

export default db;