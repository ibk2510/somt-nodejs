const Subscribe = require("../models/subscription");
const moment = require("moment");
const User = require("../models/user");

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

exports.getAllSubscribtions = (req, res) => {
  // const sub_data;
  Subscribe.find({}).populate("Product").exec(function(err ,data){
    if (err) {
        return res.status(400).json({
          message: err,
        });
      }
      if (data) {
          const user =  data[0].user;
          // console.log(user);
          User.find(user,(err , user_data)=>{
            if(err){
              return res.status(400).json({
                msg : err
              })
            }
            if(user_data){
              return res.status(200).json({
                data,
                user_data
              })
            }
          })          
      }
});

};
