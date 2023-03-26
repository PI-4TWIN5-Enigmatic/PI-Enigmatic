const bodyParser = require('body-parser')
const express = require('express')
const  mongoose  = require('mongoose')
const app = express()
require('dotenv').config()  
const cors = require('cors')
const passport = require("passport");
const session = require("express-session");

//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// import routes
const userRoutes = require('./route/user')
const associationRoutes = require('./route/association')
const googleAuth = require('./route/google');
const morgan = require('morgan')
const eventRoutes=require('./route/event')
const postRoutes = require('./route/post.routes');


// MIDDELWARE
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

//GOOGLE
app.use(passport.initialize());
require("./controllers/google-auth")(passport);


// ROUTES MIDDELWARE
app.use("/api",userRoutes)
app.use("/association" , associationRoutes)
app.use("/", googleAuth);
app.use("/event", eventRoutes);
app.use('/api/post', postRoutes);


// connect  database 
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true })
.then(() => {
console.log('Connected successfully to MongoDB server');
// Perform database operations here
})
.catch((err) => console.error(err));


app.get('/', function (req, res) {
  res.send('Hello World')
})

const port = process.env.PORT || 8000; 



app.listen(port,()=>{
    console.log("running");
});

