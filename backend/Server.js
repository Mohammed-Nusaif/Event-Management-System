const express = require('express');

const cors = require('cors');
const router = require('./Router/Router2');
const connection = require('./Config/config');
const { config } = require('dotenv');




connection()


const app = express();
app.use(express.json())
app.use(cors());
app.use('/',router)
config.env = config()
const port = process.env.PORT || 5000; 
app.listen(port,console.log(`server is running ${port}`))

