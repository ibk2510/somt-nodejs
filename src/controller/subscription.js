const Subscribe = require("../models/subscription");
const moment = require("moment");
const User = require("../models/user");
const Product = require("../models/Product");

exports.subscribe = (req, res) => {
  const { Product, start, end } = req.body;

  const _subscription = new Subscribe({
    Product,
    user: req.user,
    start: moment.utc(start),
    end: moment.utc(end),
  });

  _subscription.save((err, data) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    }
    if (data) {
      return res.status(200).json({
        data: data,
      });
    }
  });
};

exports.getAllSubscribtions = async (req, res) => {
  // const sub_data;
  await Subscribe.find()
    .populate({ path: 'Product', model: Product })
    .populate({ path: 'user', model: User })   // await person.populate('stories').populate('fans').execPopulate();
    .exec(function (err, data) {
      if (err) {
        return res.status(400).json({
          message: err,
        });
      }
      if (data) {
        const user = data[0].user;
        // console.log(user);
        return res.status(200).json({
          data,
        });
      }
    });
};
