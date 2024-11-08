import express from "express";
import dotenv from "dotenv";
import getDb from "./db/conn.mjs";
import { setupSchema } from "./db/schema.mjs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());

// Initialize database schema
async function initializeDb() {
    try {
        await setupSchema();
        console.log("Database schema initialized successfully");
    } catch (error) {
        console.error("Failed to initialize database schema:", error);
        process.exit(1);
    }
}

// Call initialize function
initializeDb();

// Basic test route
app.get("/", async (req, res) => {
    try {
        const db = await getDb();
        // Test inserting a document that should pass validation
        const testGrade = {
            class_id: 101,
            learner_id: 1,
            score: 85.5,
            timestamp: new Date()
        };
        
        const result = await db.collection("grades").insertOne(testGrade);
        res.json({
            message: "MongoDB connection and schema validation are working!",
            insertedId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: "Error testing database connection",
            error: error.message
        });
    }
});

// Global error handling
app.use((err, _req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});