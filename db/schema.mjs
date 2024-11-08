cat > db/schema.mjs << 'EOF'
import getDb from "./conn.mjs";

const gradesValidationSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["class_id", "learner_id", "score"],
        properties: {
            class_id: {
                bsonType: "int",
                minimum: 0,
                maximum: 300,
                description: "must be an integer between 0 and 300"
            },
            learner_id: {
                bsonType: "int",
                minimum: 0,
                description: "must be an integer greater than or equal to 0"
            },
            score: {
                bsonType: "double",
                minimum: 0,
                maximum: 100,
                description: "must be a number between 0 and 100"
            },
            timestamp: {
                bsonType: "date",
                description: "must be a valid date"
            }
        }
    }
};

async function setupSchema() {
    try {
        const db = getDb();
        
        // Create or modify the grades collection with validation
        try {
            await db.createCollection("grades", {
                validator: gradesValidationSchema,
                validationAction: "warn" // This will warn instead of reject invalid documents
            });
            console.log("Grades collection created with validation rules");
        } catch (e) {
            if (e.code === 48) { // Collection already exists
                await db.command({
                    collMod: "grades",
                    validator: gradesValidationSchema,
                    validationAction: "warn"
                });
                console.log("Grades collection validation rules updated");
            } else {
                throw e;
            }
        }

        // Create indexes
        const gradesCollection = db.collection("grades");
        await gradesCollection.createIndex({ "class_id": 1 });
        await gradesCollection.createIndex({ "learner_id": 1 });
        await gradesCollection.createIndex({ "learner_id": 1, "class_id": 1 });
        
        console.log("Indexes created successfully");

        // Return the collection for potential future use
        return gradesCollection;
    } catch (error) {
        console.error("Error setting up schema:", error);
        throw error;
    }
}

export { setupSchema, gradesValidationSchema };
EOF