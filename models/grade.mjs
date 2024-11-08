import mongoose from 'mongoose';

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
}, {
  versionKey: false
});

// Add indexes
gradeSchema.index({ class_id: 1 });
gradeSchema.index({ learner_id: 1 });
gradeSchema.index({ learner_id: 1, class_id: 1 });

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;