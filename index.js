import express from "express";
import dotenv from "dotenv";
import getDb from "./db/conn.mjs";
import { setupSchema } from "./db/schema.mjs";
import gradesRoutes from "./routes/grades.js";

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

// Mount routes
app.use("/grades", gradesRoutes);

// Basic test route
app.get("/", (req, res) => {
    res.send("Grades API is running!");
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