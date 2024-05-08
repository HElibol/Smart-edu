const express = require('express');

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/signup').post(authController.createUser); 
router.route('/login').post(authController.loginUser); 
router.route('/logout').get(authController.logoutUser);
//önce outhMiddleware kontrol ediyor her şey tamam ise next çalışır ve bir sonrakine geçer
router.route('/dashboard').get(authMiddleware , authController.getDashboardPage); //http://localhost:3000/users/dashboard


module.exports = router;