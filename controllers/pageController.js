const Course = require('../models/Course');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {

  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({role: 'student'});
  const totalTeacher = await User.countDocuments({role: 'teacher'});

  res.status(200).render('index', {

    page_name: 'index',
    courses,
    totalCourses,
    totalStudents,
    totalTeacher

  });

};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try{

  console.log(req.body);


  req.flash("success", "Mesajınızı aldık.");


  res.redirect('/contact');

  }catch(err){

    req.flash("error", `İletişime geçemedik! ${err}`);
    res.redirect('/contact');

  }



};


