
const Category = require('../models/Category');

exports.categoryCreate = async (req, res) => {

  try {
    const category = await Category.create(req.body);

    res.status(201).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      err: err
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
