const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Incident = require("../../models/incident");
const Employer = require("../../models/employer")

// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  Incident.find()
    .select("name type _id department employer status description")
    .populate('employer')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        incidents: docs.map(doc => {
          return {
            _id: doc._id,
            employer: doc.employer,
            name: doc.name,
            type: doc.type,
            department: doc.department,
            status: doc.status,
            description: doc.description,
            request: {
              type: "GET",
              url: "http://localhost:5000/incidents/" + doc._id
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
  Employer.findById(req.body.employerId)
      .then(employer => {
      if (!employer) {
        return res.status(404).json({
          message: "Employer not found"
        }
      );
      }
        const incident = new Incident({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        department: req.body.department,
        employer: req.body.employerId,
        status: req.body.status,
        description:req.body.description
      });
      return incident.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdIncident: {
          _id: result._id,
          name: result.name,
            type: result.type,
            _id: result._id,
            department: result.department,
            employer: result.employer,
            status: result.status,
            description: result.description,
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/incidents/" + result._id
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



router.get("/:incidentId", (req, res, next) => {
  Order.findById(req.params.incidentId)
    .populate('employer')
    .exec()
    .then(incident => {
      if (!incident) {
        return res.status(404).json({
          message: "Incident not found"
        });
      }
      res.status(200).json({
        incident: incident,
        request: {
          type: "GET",
          url: "http://localhost:5000/incidents"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});



router.patch("/:incidentId", (req, res, next) => {
  const id = req.params.incidentId;
  //const updateOps = {};
 // for (const ops of req.body) {
   // updateOps[ops.propName] = ops.value;
 // }
  Incident.update({ _id: id }, { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Incident updated',
          request: {
              type: 'GET',
              url: 'http://localhost:5000/incidents/' + id
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

router.delete("/:incidentId", (req, res, next) => {
  const id = req.params.incidentId;
  Incident.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Incident deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:5000/incidents',
              body: { name: 'String', type: 'String', department: 'String', employer: 'String', status: 'String', description: 'String' }
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
