const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const configureRouter = require('./config/router.config')
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const passport = require('passport');
const { jwtStrategy, jwtStrategyRat, jwtStrategyRfi } = require('./config/passport.config');

/* Middlewares */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.options('*',cors());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
passport.use('jwtRat', jwtStrategyRat);
passport.use('jwtRfi', jwtStrategyRfi);
/* Router */
configureRouter(app);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(3000, function () {
    console.log('Listening on 3000 ...');
});
