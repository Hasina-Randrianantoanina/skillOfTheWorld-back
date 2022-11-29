const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    titre: { type: String, required: true },
    description: { type: String, required: true },
    photoCouverture: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', articleSchema);
