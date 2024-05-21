const express = require('express');

const pageController = require('../controllers/pageController');

const router = express.Router();

const redirectMiddleware = require('../middlewares/redirectMiddleware');

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail);

router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);


module.exports = router;