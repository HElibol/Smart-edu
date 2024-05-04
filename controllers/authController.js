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

//hocanın yazdığı hata veren kısım.
/* exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    await User.findOne({ email }, (err, user) => {
      
      if (user) {
          bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            //USER SESSION
            res.status(200).send("Giris Basarili");
          }
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'sifre yanlis',
      err: err,
    });
  }
}; */

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send('kullanici yok');
    }
    const same = await bcrypt.compare(password, user.password);
    if (same) {
      res.status(200).send('login');
    }
  } catch (err) {
    res.status(400).json({
      stauts: 'sifre yanlis',
      err: err,
    });
  }
};

