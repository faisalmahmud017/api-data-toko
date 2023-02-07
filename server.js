const express = require('express');
const cors = require('cors')
const Router = require ('./src/routers/Router');
require('dotenv').config();
// const dotenv =require('dotenv');
// dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use(Router);

app.listen(process.env.PORT || 8080, ()=> {
    console.log(`server running port: ${process.env.PORT}`);
})