const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../../models/order");
const Product = require("../../models/product");



// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  Order.find()
    .select("product customer quantity status _id")
    .populate('product')
    .populate('customer')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            customer: doc.customer,
            quantity: doc.quantity,
            status: doc.status,
            request: {
              type: "GET",
              url: "http://localhost:5000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
      .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        }
      );
      }
        const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
        customer: req.body.customerId,
        status: req.body.status
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          customer: result.customer,
          quantity: result.quantity,
          status: result.status
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product')
    .populate('customer')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:5000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  //const updateOps = {};
  //for (const ops of req.body) {
   // updateOps[ops.propName] = ops.value;
 // }
  Order.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Order updated',
          request: {
              type: 'GET',
              url: 'http://localhost:5000/orders/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:orderId", (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:5000/orders",
          body: { productId: "ID",customerId:"ID", quantity: "Number",status: "String" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
