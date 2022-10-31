const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const candidatSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 120,
      trim: true,
    },
    prenom: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 120,
      trim: true,
    },
    dateNaissance: { type: String, required: true },
    localisation: { type: String, required: true },
    email: {
      type: String,
      // required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    isVerified: { type: Boolean, default: false },

    /* image: {
      data: Buffer,
      contentType: String,
    }, */

    uploadLogo: {
      type: String,
    },
    listLM: [
      {
        file1_path: {
          type: String,
        },
        file1_mimetype: {
          type: String,
        },
      },
    ],
    listCV: [
      {
        file1_path: {
          type: String,
        },
        file1_mimetype: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
candidatSchema.plugin(uniqueValidator);

/**test */
// play function before save into display: 'block',
candidatSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
/**fin test */

candidatSchema.statics.login = async function (email, password) {
  const candidat = await this.findOne({ email });
  if (candidat) {
    const auth = await bcrypt.compare(password, candidat.password);
    if (auth) {
      return candidat;
    }
    throw Error('password incorrect');
  }
  throw Error('email incorrect');
};

module.exports = mongoose.model('Candidat', candidatSchema);
