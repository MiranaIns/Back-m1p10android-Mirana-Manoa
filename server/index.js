require("../config/app.config");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Logger = require('../utils/logger.util.js');
const logger = new Logger();
const {configureRouter} = require('../config/router.config');
const notFoundMiddleware = require("../middlewares/notFound.middleware");
const errorMiddleware = require("../middlewares/error.middleware");
var serveIndex = require('serve-index');
var path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*',cors());
//Authentication middleware
configureRouter(app);
console.log(path.join(__dirname,"..","log"));
app.use('/logs',express.static(path.join(__dirname,"..","log")));
app.use("/logs",serveIndex(path.join(__dirname,"..","log")));
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
