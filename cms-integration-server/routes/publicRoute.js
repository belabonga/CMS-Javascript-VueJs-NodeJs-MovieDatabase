const Controller = require('../controllers/controller');
const route = require('express').Router();

route.get('/favourites', Controller.readFavourite)
route.post('/favourite/:id', Controller.addBookmark);


module.exports = route;