const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const app = express();


//app.use(express.json());

app.use(express.json({ extended: false }));
app.use(passport.initialize());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
  });


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => res.send('api Running'));

app.use('/users', require('./routes/api/users'));

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

