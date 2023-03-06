const bodyParser = require('body-parser')
const express = require('express')
const  mongoose  = require('mongoose')
const app = express()
require('dotenv').config()  
const cors = require('cors')

// import routes
const userRoutes = require('./route/user')
const associationRoutes = require('./route/association')
const morgan = require('morgan')

// MIDDELWARE
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())


// ROUTES MIDDELWARE
app.use("/api",userRoutes)
app.use("/association" , associationRoutes)


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

