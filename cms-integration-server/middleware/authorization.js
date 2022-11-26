// after logging in
// To declare who can access every pages

const { Movie } = require("../models/index");

class Authorization {
    static async authorization (req, res, next) {
        try {
            const { id } = req.params;
            const {id : authorId, role} = req.author

            const data = await Movie.findByPk(id)

            if (!data) {
                throw { name : `MOVIE_NOT_FOUND` }
            }

            if (role === "admin") {
                next()
            } else if (role === "staff") {
                if (authorId !== data.authorId) {
                    throw { name : `ACCESS_DENIED` }
                } else {
                    next()
                }
            }
        } catch (error) {
            next(error)
        }
    };

    static async isAdmin (req, res, next) {
        try {
            const { id } = req.params;
            const {id : authorId, role} = req.author

            const data = await Movie.findByPk(id)

            if (!data) {
                throw { name : `MOVIE_NOT_FOUND` }
            }

            if (role === "admin") {
                next()
            }
        } catch (error) {
            next(error)
        }
    };

    static async isCustomer (req, res, next) {
        try {
            const { id } = req.params;
            const {id : authorId, role} = req.author

            const data = await Movie.findByPk(id)

            if (!data) {
                throw { name : `MOVIE_NOT_FOUND` }
            }

            if (role === "customer") {
                next()
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Authorization