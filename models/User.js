const mongoose = require('mongoose');
const Scheam = mongoose.Schema;
const bcrypt = require('bcrypt');


const UserScheam = new Scheam({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student"
  }

});

UserScheam.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});


const User = mongoose.model('User', UserScheam);

module.exports = User;
