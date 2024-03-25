const express = require('express');
const router = require('./Router/Router');
const connection = require('./Mongodb/mongo');
const dotenv = require('dotenv')
const cors = require('cors')

connection()
const app = express();
app.use(express.json())
app.use(cors());
app.use('/', router) 


dotenv.config()
Port = 4000;
app.listen(Port,console.log(`server is running in ${Port}`))