
const Coures = require('../models/Course');

exports.createCourse = async (req, res) => {
  const course = await Coures.create(req.body);

  try {
    res.status(201).json({
      stauts: 'basarili',
      course: course,
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      err: err
    });
  }
};

exports.getAllCourses = async (req, res) => {


  try {
    const course = await Coures.find();
    res.status(200).render('courses', {
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
