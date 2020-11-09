const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Customer = require("../../models/customer");

router.get("/", (req, res, next) => {
  Customer.find()
    .select("name address _id company tel email")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        customers: docs.map(doc => {
          return {
            name: doc.name,
            address: doc.address,
            company: doc.company,
            tel: doc.tel,
            email: doc.email,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/customers/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address: req.body.address,
    company: req.body.company,
    tel: req.body.tel,
    email:req.body.email
  });
  customer
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Customer successfully",
        createdCustomer: {
            name: result.name,
            address: result.address,
            _id: result._id,
            company: result.company,
            tel: result.tel,
            email: result.email,
            request: {
                type: 'GET',
                url: "http://localhost:5000/customers/" + result._id
            }
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

router.get("/:customerId", (req, res, next) => {
  const id = req.params.customerId;
  Customer.findById(id)
    .select('name address _id company tel email ')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:5000/customers'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:customerId", (req, res, next) => {
  const id = req.params.customerId;
  //const updateOps = {};
  //for (const ops of req.body) {
    //updateOps[ops.propName] = ops.value;
 // }
  Customer.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Customer updated',
          request: {
              type: 'GET',
              url: 'http://localhost:5000/customers/' + id
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

router.delete("/:customerId", (req, res, next) => {
  const id = req.params.customerId;
  Customer.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Customer deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:5000/customers',
              body: { name: 'String', address: 'String', company: 'String', tel: 'Number', email: 'String' }
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

    

module.exports = router;
