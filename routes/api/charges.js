const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Charge = require("../../models/charge");

router.get("/", (req, res, next) => {
  Charge.find()
    .select("name type _id amount department status description")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        charges: docs.map(doc => {
          return {
            name: doc.name,
            type: doc.type,
            amount: doc.amount,
            department: doc.department,
            status: doc.status,
            description: doc.description,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/charges/" + doc._id
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
  const charge = new Charge({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    amount: req.body.amount,
    department: req.body.department,
    status: req.body.status,
    description:req.body.description
  });
  charge
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Charge successfully",
        createdCharge: {
            name: result.name,
            type: result.type,
            _id: result._id,
            amount: result.amount,
            department: result.department,
            status: result.status,
            description: result.description,
            request: {
                type: 'GET',
                url: "http://localhost:5000/charges/" + result._id
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

router.get("/:chargeId", (req, res, next) => {
  const id = req.params.chargeId;
  Charge.findById(id)
    .select('name type _id amount department status description ')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            charge: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:5000/charges'
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

router.patch("/:chargeId", (req, res, next) => {
  const id = req.params.chargeId;
  //const updateOps = {};
  //for (const ops of req.body) {
   // updateOps[ops.propName] = ops.value;
 // }
  Charge.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Charge updated',
          request: {
              type: 'GET',
              url: 'http://localhost:5000/charges/' + id
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

router.delete("/:chargeId", (req, res, next) => {
  const id = req.params.chargeId;
  Charge.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Charge deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:5000/charge',
              body: { name: 'String', type: 'String', amount: 'Number', department: 'String', status: 'String', description: 'String' }
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
