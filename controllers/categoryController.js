
const Category = require('../models/Category');

exports.categoryCreate = async (req, res) => {
  const category = await Category.create(req.body);

  try {
    res.status(201).json({
      stauts: 'basarili',
      category: category,
    });
  } catch (err) {
    res.status(400).json({
      stauts: 'fail',
      err: err
    });
  }
};