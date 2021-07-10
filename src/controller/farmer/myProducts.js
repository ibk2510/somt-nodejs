const Product = require("../../models/Product");


exports.getMyproducts = (req , res) => {
    Product.find({ 'supplier' : req.user.email }, (err, data) => {
        if (err) {
          return res.status(400).json({
            message: "something went wrong in getting farmer's products",
          });
        }
        if (data) {
            // console.log(req.user.email);
          res.status(200).json({
            data,
          });
        }
      });
}