const mongoose = require('mongoose');
const Scheam = mongoose.Schema;

const CourseScheam = new Scheam({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', CourseScheam);

module.exports = Course;
