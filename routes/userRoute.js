const express = require('express');


const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');


const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please enter name aq')
    ],
    authController.createUser); 
router.route('/login').post(authController.loginUser); 
router.route('/logout').get(authController.logoutUser);
//önce outhMiddleware kontrol ediyor her şey tamam ise next çalışır ve bir sonrakine geçer
router.route('/dashboard').get(authMiddleware , authController.getDashboardPage); //http://localhost:3000/users/dashboard

router.route('/:id').delete(authController.deleteUser);


module.exports = router;