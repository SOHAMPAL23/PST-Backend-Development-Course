// courses

// courseId
// name:
// Instructor : Object.Id ref: users

const {mongoose} =require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
