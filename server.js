require('dotenv').config({ path: './config/.env' });
require('./config/db');
const path = require('path');
const receiveEmail = require('./utils/receiveEmail');
const express = require('express');
const cors = require('cors');

const candidatRoute = require('./routes/candidat.routes');
const entrepriseRoute = require('./routes/entreprise.routes');
const offreRoute = require('./routes/offre.routes');
const adminRoute = require('./routes/admin.routes');
const evenementRoute = require('./routes/evenement.route');
const jobDAtingRoute = require('./routes/jobDating.route');
const articleRoute = require('./routes/article.route');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { generateUploadURL } = require('./s3');

/* const {
  checkCandidat,
  requireAuth,
} = require('./middleware/candidat.middleware'); */

/* const {
  checkEntreprise,
  requireAuthEntreprise,
} = require('./middleware/entreprise.middleware'); */

/* const {
  checkAdmin,
  requireAuthAdmin,
} = require('./middleware/admin.middleware'); */

const app = express();

//app.use(express.json());
//app.use(cors());
/* const corsOptions = {
  origin:  process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type', 'https://www.skilloftheworld.com'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}; */

app.use((req, res, next) => {
  //d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
  res.setHeader('Access-Control-Allow-Origin', 'https://www.skilloftheworld.com');
  //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**Candidat*/
// jwt
// verification de token à chaque action dans le site
// app.get('*', checkCandidat);
//verification de token à la première authentification
// app.get('/jwtidcandidat', requireAuth, (req, res) => {
//  res.status(200).send(res.locals.candidat._id);
// });

/**Entreprise*/
// jwt
// app.get('*', checkEntreprise);
// app.get('/jwtidentreprise', requireAuthEntreprise, (req, res) => {
//  res.status(200).send(res.locals.entreprise._id);
// });

/**Admin*/
// jwt
// app.get('*', checkAdmin);
// app.get('/jwtidAdmin', requireAuthAdmin, (req, res) => {
//  res.status(200).send(res.locals.admin._id);
// });

app.get('/getURL', async (req, res) => {
  const url = await generateUploadURL();
  res.send(url);
});

// recevoir des mails venant de client
app.post('/api/message', async (req, res) => {
  await receiveEmail(req.body.objet, req.body.message);
  res.send("Vous vennez d'envoyez un message à l'admin" );})
//routes
app.use('/files', express.static(path.join(__dirname, './client/src/Assets/files')));
app.use('/images', express.static(path.join(__dirname, './client/src/Assets/files')));
app.use('/api/user/candidat', candidatRoute);
app.use('/api/user/entreprise', entrepriseRoute);
app.use('/api/user/admin', adminRoute);
app.use('/api/offre', offreRoute);
app.use('/api/evenement', evenementRoute);
app.use('/api/jobdating', jobDAtingRoute);
app.use('/api/article', articleRoute);

//serveur
/* app.listen(process.env.PORT, (req, res) => {
  console.log('Le serveur demarre sur le port ', process.env.PORT);
}); */

/* if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
} */

/* 
 */

/* app.use('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname, './client/public/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
}); */

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function(req, res){
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
})

//serveur
app.listen(process.env.PORT, (req, res) => {
  console.log("Le serveur a demarré sur le port ", process.env.PORT);
});
