const router = require("express").Router();
const offreController = require("../controllers/offre.controller");

//read offre
router.get("/", offreController.readOffre);
//read one offre ajouter par aubin
router.get("/:id", offreController.readOneOffre);

router.get("/entreprise/:id",offreController.readOffreEntreprise)
/
//create offre
router.post("/", offreController.createOffre);
//update offre
router.patch("/update/:id", offreController.updateOffre);
//delete offre
router.delete("/:id", offreController.deleteOffre);
// ajout de candidat ajouter par aubin
router.patch("/:id",offreController.addCandidat);

module.exports = router;
