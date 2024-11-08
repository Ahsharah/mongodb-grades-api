# Student Grades API

A RESTful API for managing student grades using MongoDB and Mongoose. Built as part of the Per Scholas MongoDB Course, this API demonstrates the transition from MongoDB Node driver to Mongoose while maintaining robust functionality for grade management and statistical analysis.

## Features

### Core Functionality
- Complete CRUD operations for grade management
- Statistical analysis across all grades and per class
- Performance tracking with student achievement metrics
- Automated timestamp tracking

### Technical Implementation
- MongoDB schema validation and data integrity
- Optimized database queries with proper indexing
- Advanced aggregation pipelines for statistics
- ESM Modules architecture

## API Endpoints

### Statistics Routes
- `GET /grades/stats` - Retrieve overall grade statistics
- `GET /grades/stats/:id` - Get statistics for a specific class

### CRUD Operations
- `GET /grades` - Retrieve all grades
- `POST /grades` - Create a new grade
- `PUT /grades/:id` - Update an existing grade
- `DELETE /grades/:id` - Remove a grade

## MongoDB Schema

```javascript
const gradeSchema = new mongoose.Schema({
  class_id: {
    type: Number,
    required: true,
    min: 0,
    max: 300
  },
  learner_id: {
    type: Number,
    required: true,
    min: 0
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});
```

## Project Structure
```
mongodb-grades-api/
├── db/
│   └── conn.mjs         # Mongoose connection setup
├── models/
│   └── grade.mjs        # Grade schema and model
├── routes/
│   └── grades.mjs       # API endpoints
├── index.mjs            # Application entry point
├── package.json
└── .env
```

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd mongodb-grades-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/school_db
PORT=5050
```

4. Start the development server:
```bash
npm run dev
```

## API Usage Examples

### Create a New Grade
```bash
curl -X POST http://localhost:5050/grades \
-H "Content-Type: application/json" \
-d '{
  "learner_id": 123,
  "class_id": 100,
  "score": 85
}'
```

### Get Class Statistics
```bash
curl http://localhost:5050/grades/stats/100
```

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- ES Modules

## Development Features
- Modern JavaScript with ES Modules
- RESTful API design principles
- Comprehensive error handling
- MongoDB/Mongoose best practices
- Data validation and sanitization

## Author
Developed by Alexandria W. for the Per Scholas MongoDB Course

---
For more information about Per Scholas courses, visit [Per Scholas](https://perscholas.org)
