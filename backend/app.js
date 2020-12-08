const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');

const app = express();
const users = require('./routes/users');
const port = 3000;
app.use(cors());

//connect to database
mongoose.connect(config.database);
//on connection successful
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database '+config.database);
});
// on database connection error
mongoose.connection.on('error', (err)=>{
    console.log('Database error '+ err);
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//use middlewares
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport') (passport);

//routes
app.use('/users', users);

//index route
app.get('/', (req, res) => {
    res.send("Invalid endpoint");
});

app.get('*', (req, res) => {
    res.redirect('localhost:3000');
})


//start server
app.listen(port, () => {
    console.log("Server started on port " + port);
});
