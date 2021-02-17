//requires

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
require('./config/db');
var port = process.env.PORT || 3000;
const empRoute = require('./routes/employee.routes');

//middlewares
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())
app.use(cors());

//routes

app.use('/api', empRoute)

//server

app.listen(port,()=>{
    console.log(`Server Running on ${port}`);
})

