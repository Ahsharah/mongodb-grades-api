# Grades API

A robust REST API for managing student grades with MongoDB, featuring advanced aggregation pipelines and data validation. Assistetd by Preply platform.

## Features

- **Grade Statistics**
  - Calculate overall grade statistics across all classes
  - View statistics for specific classes
  - Track students performing above 70% threshold

- **Data Validation**
  - Enforces valid class IDs (0-300)
  - Ensures valid learner IDs (≥ 0)
  - Includes timestamp tracking
  - Warning-based validation for flexible data handling

- **Performance Optimization**
  - Indexed queries for class_id and learner_id
  - Compound index for combined queries
  - Efficient aggregation pipelines

## API Endpoints

### Statistics Routes
- `GET /grades/stats` - Get overall grade statistics
- `GET /grades/stats/:id` - Get statistics for a specific class

### CRUD Operations
- `GET /grades` - Retrieve all grades
- `POST /grades` - Create a new grade
- `PUT /grades/:id` - Update a grade
- `DELETE /grades/:id` - Delete a grade

## Technical Implementation

### MongoDB Schema
```javascript
{
  class_id: {
    bsonType: "int",
    minimum: 0,
    maximum: 300
  },
  learner_id: {
    bsonType: "int",
    minimum: 0
  },
  score: {
    bsonType: "double",
    minimum: 0,
    maximum: 100
  },
  timestamp: {
    bsonType: "date"
  }
}
```

### Project Structure
```
mongodb-grades-api/
├── db/
│   ├── conn.mjs       # Database connection
│   └── schema.mjs     # Schema validation
├── routes/
│   └── grades.js      # API routes
├── index.js           # Application entry
└── README.md         # Documentation
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5050
   ```
4. Run the server:
   ```bash
   npm run dev
   ```

## Example Requests

### Get Overall Statistics
```bash
curl http://localhost:5050/grades/stats
```

### Create Grade
```bash
curl -X POST http://localhost:5050/grades \
-H "Content-Type: application/json" \
-d '{
  "class_id": 101,
  "learner_id": 1,
  "score": 85.5
}'
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- MongoDB Aggregation Framework
- Git for version control

## Development Practices

- Modular code organization
- Comprehensive error handling
- MongoDB best practices for indexing and validation
- RESTful API design principles

---
Developed by Alexandria for Per Scholas MongoDB Course
