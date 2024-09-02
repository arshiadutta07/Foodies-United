const express = require("express");
const app = express();
const cors = require('cors');
const port = 4000;
const routes = require('./Routes/api-collection');
const seedData = require('./seed-data/seed-data-DB');
const path = require('path');
const googleAuth = require("./Routes/Authentication/googleAuthentication");
const session = require("express-session");
const { sequelize } = require('./Models/modelCollectionConfig');
const passport = require("passport");
require('dotenv').config();
const rateLimit = require('express-rate-limit');

// Configure rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 50, 
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true, 
    legacyHeaders: false, 
});

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true 
};

app.use(session({
  resave : false,
  saveUninitialized : true,
  secret : process.env.SESSION_SECRET
}))

app.use(passport.initialize());
app.use(passport.session());

//Render UI
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('auth');
})

//Parsing JSON Data
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', apiLimiter);
app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', googleAuth);

sequelize.sync({ force: false }).then(async () => {
    await seedData();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

