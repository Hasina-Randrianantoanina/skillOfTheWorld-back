const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const candidatSchema = mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: String, required: true },
    localisation: { type: String, required: true },
    imageUrl: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
candidatSchema.plugin(uniqueValidator);

candidatSchema.statics.login = async function (email, password) {
  const candidat = await this.findOne({ email });
  if (candidat) {
    const auth = await bcrypt.compare(password, candidat.password);
    if (auth) {
      return candidat;
    }
    throw Error("mot de passe incorrect");
  }
  throw Error("email incorrect");
};

module.exports = mongoose.model("Candidat", candidatSchema);
