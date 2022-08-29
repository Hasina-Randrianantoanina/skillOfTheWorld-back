const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const entrepriseSchema = mongoose.Schema(
  {
    nomEntreprise: { type: String, required: true },
    lieuxActivite: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    fonction: { type: String, required: true },
    telephone: { type: Number, required: true },
    nombreSalarie: { type: Number, required: true },
    siteInternet: { type: String, required: true },
    logoUrl: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
entrepriseSchema.plugin(uniqueValidator);

entrepriseSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

entrepriseSchema.statics.login = async function (email, password) {
  const entreprise = await this.findOne({ email });
  if (entreprise) {
    const auth = await bcrypt.compare(password, entreprise.password);
    if (auth) {
      return entreprise;
    }
    throw Error("mot de passe incorrect");
  }
  throw Error("email incorrect");
};

module.exports = mongoose.model("Entreprise", entrepriseSchema);
