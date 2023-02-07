const express = require('express');
const cors = require('cors')
const Router = require ('./src/routers/Router');
require('dotenv').config();
const bodyParser = require("body-parser");
// const dotenv =require('dotenv');
// dotenv.config();
var multer = require('multer');
var upload = multer();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array()); 
app.use(cors())
app.use(express.json())
app.use(Router);

app.listen(process.env.PORT || 8080, ()=> {
    console.log(`server running port: ${process.env.PORT}`);
})