const router = require("express").Router();
const offreController = require("../controllers/offre.controller");

//read offre
router.get("/", offreController.readOffre);
//create offre
router.post("/", offreController.createOffre);
//update offre
router.put("/:id", offreController.updateOffre);
//delete offre
router.delete("/:id", offreController.deleteOffre);

module.exports = router;
