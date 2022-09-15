const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema(
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
    email: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);
adminSchema.plugin(uniqueValidator);

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error("password incorrect");
  }
  throw Error("email incorrect");
};

module.exports = mongoose.model("Admin", adminSchema);
