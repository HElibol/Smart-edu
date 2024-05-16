
const Coures = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  const course = await Coures.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    user: req.session.userID
  });

  try {
    res.status(201).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      err: err
    });
  }
};

exports.getAllCourses = async (req, res) => {

  try {

    const categorySlug = req.query.categories;

    const category = await Category.findOne({slug:categorySlug});

    let filter = {};

    if(categorySlug){
      filter = {category : category._id}
    }

    const courses = await Coures.find(filter).sort('-createdAt')
    const categories = await Category.find();

    res.status(200).render('courses', {
      courses,
      categories,
      page_name : 'courses'

    
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      err: err
    });
  }
};

exports.getCourse = async (req, res) => {

  try {
    const course = await Coures.findOne({slug : req.params.slug}).populate('user');
    res.status(200).render('course', {

      course,
      page_name : 'courses'
  
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      err: err
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    
    const user = await User.findById(req.session.userID);
    await user.courses.push({_id: req.body.course_id});
    await user.save();
    

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      err: err
    });
  }
};

