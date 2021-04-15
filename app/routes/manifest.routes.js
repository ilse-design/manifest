
module.exports = app => {
  const manifests = require("../controllers/manifest.controller.js");


  // Create a new manifest edit
  app.post("/manifest", manifests.create);

  // Retrieve all manifest edits
  app.get("/manifest", manifests.findAll);

  // Retrieve a single manifest edit
  app.get("/manifest/:manifestId", manifests.findOne);

  // Update a manifest with id 
  app.put("/manifest/:manifestId", manifests.update);

  // Delete a manifest with id
  app.delete("/manifest/:manifestId", manifests.delete);

  // delete all
  app.delete("/manifest", manifests.deleteAll);
};
