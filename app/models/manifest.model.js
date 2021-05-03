 const sql = require("./index.js");



// constructor
const Signature = function(signature) {
  this.nameSig = signature.nameSig;

};

//create a new signature
Manifest.createSig = (newSignature, result) => {
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
Manifest.getAllSig = result => {
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



// ------------------------------------------------------------------- manifest -----------------------------




// constructor
const Manifest = function(manifest) {
  this.text = manifest.text;
  this.name = manifest.name;

};

//create a new manifest
Manifest.create = (newManifest, result) => {
  sql.query("INSERT INTO ManifestText.database SET ?", newManifest, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created manifest: ", { id: res.insertId, ...newManifest });
    result(null, { id: res.insertId, ...newManifest });
  });
};



// find the last edit of the manifest
Manifest.findLast = result => {

console.log("find last started");
  sql.query("SELECT * FROM ManifestText.database ORDER BY id DESC LIMIT 0, 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found manifest: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};



Manifest.findById = (manifestId, result) => {
  sql.query(`SELECT * FROM ManifestText.database WHERE id = ${manifestId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found manifest: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Manifest.getAll = result => {
  sql.query("SELECT * FROM ManifestText.database", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("manifest: ", res);
    result(null, res);
  });
};

Manifest.updateById = (id, manifest, result) => {
  sql.query(
    "UPDATE ManifestText.database SET text = ?, name = ?, WHERE id = ?",
    [manifest.text, manifest.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated manifest: ", { id: id, ...manifest });
      result(null, { id: id, ...manifest});
    }
  );
};

Manifest.remove = (id, result) => {
  sql.query("DELETE FROM ManifestText.database WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted manifest with id: ", id);
    result(null, res);
  });
};

Manifest.removeAll = result => {
  sql.query("DELETE FROM ManifestText.database", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ManifestText.database`);
    result(null, res);
  });
};

module.exports = Manifest;
