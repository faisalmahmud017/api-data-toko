const express = require('express');
const cors = require('cors')
const Router = require ('./src/routers/Router');

const app = express();

app.use(cors())
app.use(express.json())
app.use(Router);

app.listen(3000, ()=> {
    console.log('server running port: 3000');
})