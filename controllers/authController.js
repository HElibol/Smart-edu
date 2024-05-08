const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  try {
    res.status(201).json({
      stauts: 'basarili',
      user,
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      err: err,
    });
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
  const user = await User.findOne({_id : req.session.userID});
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user: user
  });
};

