const express = require('express')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors = require("cors");
const userRouter = require('./routes/userRouter');
const fileRouter = require('./routes/fileRouter')
const app = express();
const cookieParser = require('cookie-parser');
app.use('/upload',express.static("./storage/upload"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use( cors({
    credentials: true,
    origin : "http://localhost:5173"
  }),);
app.use('/api/user',userRouter)
app.use('/api/file',fileRouter)
module.exports = app;