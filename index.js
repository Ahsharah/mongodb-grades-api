import express from "express";
import dotenv from "dotenv";
import getDb from "./db/conn.mjs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());

// Basic test route
app.get("/", async (req, res) => {
    try {
        const db = getDb();
        res.send("Successfully connected to MongoDB!");
    } catch (error) {
        res.status(500).send("Database connection not ready");
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