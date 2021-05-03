
module.exports = app => {
  const manifests = require("../controllers/manifest.controller.js");
  const signature = require("../controllers/signature.controller.js");


  // Create a new manifest edit
  app.post("/manifest", manifests.create);

  // Retrieve all manifest edits
  app.get("/manifest", manifests.findAll);

  // get last added manifest
  app.get("/manifestlast", manifests.findLastOne);

  // Retrieve a single manifest edit
  app.get("/manifest/:manifestId", manifests.findOne);

  // Update a manifest with id 
  app.put("/manifest/:manifestId", manifests.update);

  // Delete a manifest with id
  app.delete("/manifest/:manifestId", manifests.delete);

  // delete all
  app.delete("/manifest", manifests.deleteAll);


  // Create a new signature edit
  app.post("/siganture", signature.createSig);

  // Retrieve all signatures edits
  app.get("/signature", signature.findAllSig);

};
