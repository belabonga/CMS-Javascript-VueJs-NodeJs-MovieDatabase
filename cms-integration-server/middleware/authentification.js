//? AUTH TOKEN
const jwt = require('jsonwebtoken');
const { Author, Movie } = require('../models/index');

class Authentification {
    static async authentication (req, res, next) {
        try {
            // REQUIRE ACCESS TOKEN
            const { access_token } = req.headers  // from headers
            if (!access_token) {
                throw { name : 'ACCESS_TOKEN_NOT_FOUND'}
            }

            // CHECK TOKEN IS VALID OR NOT
            const validToken = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
            if (!validToken) {
                throw { name : 'INVALID_TOKEN'}
            }

            // CHECK IF DATA FOUND
            const data = await Author.findByPk(validToken.id)
            if (!data) {
                throw { name : 'INVALID_AUTHOR'}
            }

            // PASSING DATA
            req.author = {
                id : data.id,
                role : data.role,
                email : data.email
            }

            next()
        } catch (error) {
            next(error)
        }  
    }
}

module.exports = Authentification

    