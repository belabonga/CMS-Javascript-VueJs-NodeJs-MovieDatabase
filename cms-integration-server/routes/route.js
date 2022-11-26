const route = require('express').Router();
const movie = require('./movieRoutes');
const genre = require('./genreRoutes');
const public = require('./publicRoute');

const Authentification = require('../middleware/authentification');
const Controller = require('../controllers/controller');
const Error = require('../middleware/error');

route.get('/', (req, res) => {
    res.send("hellow");
});

// ADMIN & STAFF LOGIN & REGISTER ROUTES
route.post('/login', Controller.login);
route.post('/register', Controller.register);
route.post('/google-signin', Controller.googleSignIn);

// PUBLIC LOGIN & REGISTER ROUTES
route.post('/pub/login', Controller.loginPublic);
route.post('/pub/register', Controller.registerPublic);
route.post('/pub/google-signin', Controller.googleSignInPublic);

// PUBLIC ROUTES - BUT DOESN'T NEED AUTHENTICATION
route.get('/pub/movies', Controller.readMoviesPublic);
route.get('/pub/movie/:id', Controller.movieDetailPublic)

// AUTH : CHECKING IS AUTHOR LOGIN OR NOT
// ANY ROUTE UNDER THIS NEED AUTHENTICATION FIRST
route.use(Authentification.authentication) 

// PUBLIC ROUTES
route.use('/pub', public)

// ADMIN & STAFF ROUTES
route.use('/movie', movie);
route.use('/genre', genre);
route.get('/logs', Controller.logs);

// REQUIRE ERROR MIDDLEWARE
route.use(Error.Error)

module.exports = route;