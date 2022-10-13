const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const { isEmail } = require('validator');

const entrepriseSchema = mongoose.Schema(
  {
    nomEntreprise: { type: String, required: true },
    nomInterlocuteur: { type: String, required: true },
    prenomInterlocuteur: { type: String, required: true },
    fonction: { type: String, required: true },
    telephone: { type: Number, required: true },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
      unique: true,
    },
    lieuxActivite: { type: String, required: true },
    nombreSalaire: { type: String, required: true },
    siteWeb: { type: String, required: true },
    uploadLogo: { type: String },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);
entrepriseSchema.plugin(uniqueValidator);

entrepriseSchema.pre('save', async function (next) {
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
    throw Error('password incorrect');
  }
  throw Error('email incorrect');
};

module.exports = mongoose.model('Entreprise', entrepriseSchema);
