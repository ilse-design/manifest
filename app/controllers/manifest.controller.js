const Manifest = require("../models/manifest.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {

	exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const manifest = new Manifest({
    test: req.body.text,
    name: req.body.name
  });

  // Save Customer in the database
  Manifest.create(manifest, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manifest."
      });
    else res.send(data);
  });
};
  
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Manifest.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving manifest."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Manifest.findById(req.params.manifestId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Manifest with id ${req.params.manifestId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Manifest with id " + req.params.manifestId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Manifest.updateById(
    req.params.manifestId,
    new Manifest(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Manifest with id ${req.params.manifestId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Manifest with id " + req.params.manifestId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Manifest.remove(req.params.manifestId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Manifest with id ${req.params.manifestId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Manifest with id " + req.params.manifestId
        });
      }
    } else res.send({ message: `manifest was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
 Manifest.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all manifests."
      });
    else res.send({ message: `All Manifest were deleted successfully!` });
  });
};
