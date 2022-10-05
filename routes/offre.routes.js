const router = require("express").Router();
const offreController = require("../controllers/offre.controller");

//read offre
router.get("/", offreController.readOffre);
// read all offre where isValidate : true
router.get("/valide/", offreController.readOffreValide)

//read one offre ajouter par aubin
router.get("/:id", offreController.readOneOffre);

router.get("/entreprise/:id",offreController.readOffreEntreprise)

// read status of candidat
router.get("/status/:id",offreController.readCandidatStatus)
//create offre
router.post("/", offreController.createOffre);
//update offre
router.patch("/update/:id", offreController.updateOffre);
// validation de candidat 
router.put("/validate/:id", offreController.repondreCandidat);
//delete offre
router.delete("/:id", offreController.deleteOffre);
// ajout de candidat ajouter par aubin
router.patch("/:id",offreController.addCandidat);





module.exports = router;
