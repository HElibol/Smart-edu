const mongoose = require('mongoose');
const slugify = require('slugify');
const Scheam = mongoose.Schema;

const CategoryScheam = new Scheam({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  }

});

CategoryScheam.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  })
  next();
});

const Category = mongoose.model('Category', CategoryScheam);

module.exports = Category;
