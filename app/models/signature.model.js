const sql = require("./index.js");



// constructor
const Signature = function(signature) {
  this.nameSig = signature.nameSig;

};

//create a new signature
Signature.createSig = (newSignature, result) => {
  sql.query("INSERT INTO ManifestText.signatures SET ?", newSignature, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created signature: ", { id: res.insertId, ...newSignature });
    result(null, { id: res.insertId, ...newSignature });
  });
};

//get all signatures
Signature.getAllSig = result => {
  sql.query("SELECT * FROM ManifestText.signatures", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("signatures: ", res);
    result(null, res);
  });
};

module.exports = Signature;