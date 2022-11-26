const Controller = require('../controllers/controller');
const route = require('express').Router();

route.get('/', Controller.readGenres);
route.post('/', Controller.createGenre);
route.delete('/:id', Controller.deleteGenre);

module.exports = route;