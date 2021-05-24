const Product = require("../models/Product");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  const { productName, productType, productDescription, quantity ,  price } =
    req.body;
    let images = [];
    if(req.files.length > 0){
        images = req.files.map(file => {
            return { img : file.filename}
        })
    }

    // console.log(images);

    // res.status(200).json({
    //     message : "API called successfully " ,
    //     images,
    //     productName,
    //     productType,
    //     productDescription
    // })
  const _product = new Product({
    productName,
    slug : slugify(productName),
    productType,
    productDescription,
    quantity,
    price,
    img : images,
    createdBy: req.user,
  });

  _product.save((err, data) => {
    if (err) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }
    if (data) {
      return res.status(201).json({
        meaasage: "product created successfully",
      });
    }
  });
};

exports.getAllproducts = (req , res)=>{
  Product.find({} , (err , data)=>{
    if(err){
      return res.status(400).json({
        message : "something went wrong"
      })
    }
    if(data){
      res.status(200).json({
        data
      })
    }
  })
}

exports.deleteOneitem = (req , res)=>{
  const product_id = req.body.product_id;
  Product.findByIdAndDelete({_id : product_id},(err, data)=>{
    if(err){
      return res.status(400).json({
        message : "something went wrong"
      })
    }
    if(data){
      return res.status(200).json({
        message : "product deleted successfully",
        data
      });
    }
  })

}
