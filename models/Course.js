const mongoose = require('mongoose');
const slugify = require('slugify');
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
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

CourseScheam.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  })
  next();
});

const Course = mongoose.model('Course', CourseScheam);

module.exports = Course;
