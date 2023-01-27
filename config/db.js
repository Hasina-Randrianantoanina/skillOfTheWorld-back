const mongoose = require("mongoose");
//connexion à la base de données
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sotw:sotw2022retina@sotwcluster.xgxdnat.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connecté à Mongoose");
});
