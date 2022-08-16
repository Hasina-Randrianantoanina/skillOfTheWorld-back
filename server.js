require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const express = require("express");
const cors = require("cors");

const candidatRoute = require("./routes/candidat.routes");
const entrepriseRoute = require("./routes/entreprise.routes");
const offreRoute = require("./routes/offre.routes");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const {
  checkCandidat,
  requireAuth,
} = require("./middleware/candidat.middleware");

const app = express();

//app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
//verification de token à chaque action dans le site
app.get("*", checkCandidat);
//verification de token à la première authentification
app.get("jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.candidat._id);
});

//routes
app.use("/api/user/candidat", candidatRoute);
app.use("/api/user/entreprise", entrepriseRoute);
app.use("/api/offre", offreRoute);

//serveur
app.listen(process.env.PORT, (req, res) => {
  console.log("Le serveur demarre sur le port ", process.env.PORT);
});
