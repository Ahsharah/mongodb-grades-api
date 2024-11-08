import express from 'express';
import { ObjectId } from 'mongodb';
import getDb from '../db/conn.mjs';

const router = express.Router();

// GET /grades/stats - Get overall statistics
router.get('/stats', async (req, res) => {
    try {
        const db = await getDb();
        const collection = db.collection('grades');
        
        const pipeline = [
            {
                $group: {
                    _id: "$learner_id",
                    weightedAverage: { 
                        $avg: "$score"
                    }
                }
            },
            {
                $facet: {
                    above70: [
                        { $match: { weightedAverage: { $gt: 70 } } },
                        { $count: "count" }
                    ],
                    total: [
                        { $count: "count" }
                    ]
                }
            },
            {
                $project: {
                    studentsAbove70: { $arrayElemAt: ["$above70.count", 0] },
                    totalStudents: { $arrayElemAt: ["$total.count", 0] },
                    percentage: {
                        $multiply: [
                            {
                                $divide: [
                                    { $arrayElemAt: ["$above70.count", 0] },
                                    { $arrayElemAt: ["$total.count", 0] }
                                ]
                            },
                            100
                        ]
                    }
                }
            }
        ];

        const result = await collection.aggregate(pipeline).toArray();
        res.json(result[0] || { studentsAbove70: 0, totalStudents: 0, percentage: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /grades/stats/:id - Get statistics for a specific class
router.get('/stats/:id', async (req, res) => {
    try {
        const db = await getDb();
        const collection = db.collection('grades');
        const classId = parseInt(req.params.id);
        
        const pipeline = [
            {
                $match: { class_id: classId }
            },
            {
                $group: {
                    _id: "$learner_id",
                    weightedAverage: { 
                        $avg: "$score"
                    }
                }
            },
            {
                $facet: {
                    above70: [
                        { $match: { weightedAverage: { $gt: 70 } } },
                        { $count: "count" }
                    ],
                    total: [
                        { $count: "count" }
                    ]
                }
            },
            {
                $project: {
                    studentsAbove70: { $arrayElemAt: ["$above70.count", 0] },
                    totalStudents: { $arrayElemAt: ["$total.count", 0] },
                    percentage: {
                        $multiply: [
                            {
                                $divide: [
                                    { $arrayElemAt: ["$above70.count", 0] },
                                    { $arrayElemAt: ["$total.count", 0] }
                                ]
                            },
                            100
                        ]
                    }
                }
            }
        ];

        const result = await collection.aggregate(pipeline).toArray();
        res.json(result[0] || { 
            studentsAbove70: 0, 
            totalStudents: 0, 
            percentage: 0,
            classId 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Let's also add basic CRUD operations for completeness

// GET /grades - Get all grades
router.get('/', async (req, res) => {
    try {
        const db = await getDb();
        const collection = db.collection('grades');
        const results = await collection.find({}).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /grades - Create a new grade
router.post('/', async (req, res) => {
    try {
        const db = await getDb();
        const collection = db.collection('grades');
        const grade = {
            ...req.body,
            timestamp: new Date()
        };
        const result = await collection.insertOne(grade);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /grades/:id - Update a grade
router.put('/:id', async (req, res) => {
    try {
        const db = await getDb();
        const collection = db.collection('grades');
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /grades/:id - Delete a grade
router.delete('/:id', async (req, res) => {
    try {
        const db = await getDb();
        const collection = db.collection('grades');
        const result = await collection.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;