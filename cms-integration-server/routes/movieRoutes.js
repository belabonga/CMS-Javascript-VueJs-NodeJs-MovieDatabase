const Controller = require('../controllers/controller');
const route = require('express').Router();
const Authorization = require('../middleware/authorization');

route.get('/', Controller.readMovies);
route.post('/', Controller.addMovie);
route.put('/:id', Authorization.authorization, Controller.modifyMovie); 
route.patch('/:id', Authorization.isAdmin, Controller.replaceMovieStatus) 
route.get('/:id', Controller.movieDetail);
route.delete('/:id', Authorization.authorization , Controller.deleteMovie);

module.exports = route;