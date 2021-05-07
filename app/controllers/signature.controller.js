const Signature = require("../models/signature.model.js");

// Create and Save a new Customer
	exports.createSig = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Signature
  const signature = new Signature({
    nameSig: req.body.nameSig
  });
    // Save signature in the database
    Signature.createSig(signature, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Signature."
        });
      else res.send(data);
    });
    
  };


  //find all signatures
exports.findLastSig = (req, res) => {
  Signature.getLastSig((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving signatures."
      });
    else res.send(data);
  });
};

exports.findAllSig = (req, res) => {
  Signature.getAllSig((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving signatures."
      });
    else res.send(data);
  });
};
