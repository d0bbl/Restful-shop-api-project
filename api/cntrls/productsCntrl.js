const Product = require("../models/product");
const mongoose = require('mongoose');

const get_Products = async (req, res) => {
  Product.find().sort({createdAt: -1})
  .then(products => {
    res.send(products);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: err.message});
  });
}

const post_Products = async (req, res) => {
  console.log(req.file);
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  newProduct.save()
  .then((product) => {
    res.status(201).json({
      message: "Product successfully created",
      createdProduct: {
        name: product.name,
        price: product.price,
        Image: product.productImage
      },
      request: {
        type: "GET",
        url: "http://localhost:3000/api/products/" + product._id
      }
    });
  })
  .catch(err => {console.log(err);
    res.status(500).json({message: err});
  });

  // res.status(201).json({
  //   message: `Handling ${req.method} requests to ${req.path}`
  // });
}

const get_Product = async (req, res) => {
  Product.findById({_id: req.params.prodId})
  .then(product => {
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({message: "No valid ID found"});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: err});
  });
}

const put_Product = async (req, res) => {
  mongoose.set('returnOriginal', false);
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.findByIdAndUpdate({_id:req.params.prodId}, {$set: updateOps})
  .then(product => {
    res.send(product);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: err});
  });
}

const delete_Product = async (req, res) => {
  Product.findByIdAndDelete({_id: req.params.prodId})
  .then(() => {
    res.redirect("/api/products");
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: err});
  });
}

module.exports = {
  get_Products,
  post_Products,
  get_Product,
  put_Product,
  delete_Product
}
