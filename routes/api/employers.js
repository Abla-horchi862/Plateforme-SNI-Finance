const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Employer = require("../../models/employer");

router.get("/", (req, res, next) => {
  Employer.find()
    .select("name position _id salary address tel email")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        employers: docs.map(doc => {
          return {
            name: doc.name,
            position: doc.position,
            salary: doc.salary,
            tel: doc.tel,
            address: doc.address,
            email: doc.email,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/employers/" + doc._id
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
  const employer = new Employer({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    position: req.body.position,
    salary: req.body.salary,
    address: req.body.address,
    tel:req.body.tel,
    email:req.body.email

  });
  employer
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Employer successfully",
        createdEmployer: {
            name: result.name,
            position: result.position,
            _id: result._id,
            salary: result.salary,
            address: result.address,
            tel: result.tel,
            email: result.email,
            request: {
                type: 'GET',
                url: "http://localhost:5000/employers/" + result._id
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

router.get("/:employerId", (req, res, next) => {
  const id = req.params.employerId;
  Employer.findById(id)
    .select('name position salary address _id  tel email ')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            employer: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:5000/employers'
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

router.patch("/:employerId", (req, res, next) => {
  const id = req.params.employerId;
 // const updateOps = {};
  //for (const ops of req.body) {
   // updateOps[ops.propName] = ops.value;
  //}
  Employer.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Employer updated',
          request: {
              type: 'GET',
              url: 'http://localhost:5000/employers/' + id
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

router.delete("/:employerId", (req, res, next) => {
  const id = req.params.employerId;
  Employer.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Employer deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:5000/employers',
              body: { name: 'String',position: 'String',salary: 'Number', address: 'String', tel: 'Number', email: 'String' }
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
