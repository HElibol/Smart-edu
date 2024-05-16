const User = require('../models/User');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Course = require('../models/Course');


exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  try {
    res.status(400).redirect("/login");
  } catch (err) {
    res.status(400).redirect("/login");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send('kullanici yok');
    }
    const same = await bcrypt.compare(password, user.password);

    if (same) {
      req.session.userID = user._id
      res.status(200).redirect('/users/dashboard')
    }

    if(!same){
      res.send('Sifre yanlis');
    }

  } catch (err) {
    res.status(400).json({
      stauts: 'sifre yanlis',
      err: err,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id : req.session.userID}).populate('courses');
  const categories = await Category.find();
  const courses = await Course.find({user: req.session.userID});

  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user: user,
    categories: categories,
    courses: courses
  });
};

