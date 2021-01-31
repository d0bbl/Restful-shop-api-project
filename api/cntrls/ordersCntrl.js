const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require('mongoose');

// GET ORDERS
const get_Orders = async (req, res) => {
  Order.find()
  .populate("product", "name", "productImage")
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      orders: docs.map(doc => {
        return{
          _id: doc._id,
          product: doc.product,
          quantity: doc.quantity,
          // image: doc.product.productImage,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/orders/" + doc._id
          }
        }
      })
    });
      // orders.forEach(order => {
      //   return res.status(200).json({
      //     products: order.product.name,
      //     quantity: order.quantity
      // });
      //   });
    })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
}

// POST ORDER
const post_Orders = async (req, res) => {
  Product.findById({_id: req.body.prodId})
  .then(product => {
    if(!product) {
      return res.status(404).json({message: "product not found"});
    }
    const newOrder = {
      product: req.body.prodId,
      quantity: req.body.quantity
    }
    return new Order(newOrder)
    .save()
  })
  .then(order => {
    res.status(201).json({
      message: "Order stored",
      cretedOrder: {
        _id: order._id,
        product: order.product._id,
        quantity: order.quantity
      },
      request: {
        type: "GET",
        url: "http://localhost:3000/api/orders/" + order._id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message: err});
  });
  }

// GET ORDER
const get_Order = async (req, res) => {
  Order.findById({_id: req.params.orderId})
  .populate("product")
  .then(order => {
    if(!order) {
     return res.status(404).json({
       message: "order  not found"
     });
    }
    res.status(200).json({
      order,
      request: {
        type: "GET",
        url: "http://localhost:3000/orders"
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
}

// DELETE ORDER
const delete_Order = async (req, res) => {
  Order.findByIdAndDelete(req.params.orderId)
  .then(order => {
    res.status(200).json({
      message: "Order deleted",
      request: {
        type: "POST",
        url: "http://localhost:3000/orders",
        body: { prodId: "ID", quantity: "Number" }
      }
    });
  })
  .catch(err => {
    res.status(500).json({error: err});
});
}

module.exports = {
  get_Orders,
  post_Orders,
  get_Order,
  delete_Order
}
