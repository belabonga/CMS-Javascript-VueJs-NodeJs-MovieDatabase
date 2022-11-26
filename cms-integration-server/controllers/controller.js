require("dotenv").config();
const bcrypt = require("bcrypt");
const { Movie, Author, Genre, History, Favourite } = require("../models/");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  //? READ ALL MOVIES
  // GET /movie
  static async readMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [ Author, Genre ],
      });
      res.status(200).json({
        statusCode: 200,
        message: "SUCCESS READ MOVIE DATA",
        movies,
      });
    } catch (error) {
      next(error);
    }
  }

  //? MOVIE DETAIL
  // GET /movie/:id
  static async movieDetail(req, res, next) {
    try {
      const id = req.params.id;
      const movies = await Movie.findByPk(id, {
        include: [Author],
      });

      if (movies) {
        res.status(200).json({
          statusCode: 200,
          message: "SUCCESS READ DATA",
          movies,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      next(error);
    }
  }

  //? CREATE NEW MOVIE
  // POST /movie
  static async addMovie(req, res, next) {
    try {
      const { id, email } = req.author
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const createdMovie = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating: +rating,
        genreId: +genreId,
        authorId: +id,
      });

      // CREATE LOGS
      await History.create({
        name : "POST",
        description : `new entity with ${createdMovie.id} created`,
        updatedBy : email
      })

      res.status(201).json({
        statusCode: 201,
        message: "MOVIE HAS BEEN CREATED",
        createdMovie,
      });
    } catch (error) {
      next(error);
    }
  }

  //? DELETE MOVIE
  // DELETE /movie/:id
  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id;
      const findOne = await Movie.findByPk(id);

      if (findOne) {
        await Movie.destroy({
          where: { id: id },
        });

        res.status(200).json({
          statusCode: 200,
          message: `${findOne.title} SUCCESS TO DELETE`,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  // ? READ ALL GENRE
  // GET /genre
  static async readGenres(req, res, next) {
    try {
      const genres = await Genre.findAll();
      res.status(200).json({
        statusCode: 200,
        message: "SUCCESS READ GENRES DATA",
        genres,
      });
    } catch (error) {
      next(error);
    }
  }

  //? CREATE NEW GENRE
  // POST /genre
  static async createGenre(req, res, next) {
    const { name } = req.body;
    try {
      const createdGenre = await Genre.create({ name });

      res.status(201).json({
        statusCode: 201,
        message: "NEW GENRE HAS BEEN CREATED",
        createdGenre,
      });
    } catch (error) {
      next(error);
    }
  }

  //? DELETE GENRE
  // DELETE /genre/
  static async deleteGenre(req, res, next) {
    try {
      const id = req.params.id;
      const findOne = await Genre.findByPk(id);

      if (findOne) {
        await Genre.destroy({
          where: { id: id },
        });

        res.status(200).json({
          statusCode: 200,
          message: `${findOne.name} SUCCESS TO DELETE`,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }

  //?  REGISTER
  // POST /register
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const data = await Author.create({
        username,
        email,
        password,
        role: `admin`,
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: "AUTHOR HAS BEEN CREATED SUCCESSFULLY",
        data: {
          id: data.id,
          email: data.email,
          username: data.username,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  //? LOGIN
  // POST /login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // COMPARE EMAIL
      const checkAuthor = await Author.findOne({
        where: { email: email },
      });

      // CHECK AND THROW ERROR
      if (!checkAuthor) {
        throw { name: "EMAIL_INVALID" };
      }

      // COMPARE PASSWORD
      const checkPassword = bcrypt.compareSync(password, checkAuthor.password); // Output : TRUE / FALSE

      // CHECK AND THROW ERROR
      if (!checkPassword) {
        throw { name: "PASSWORD_INVALID" };
      }

      // CREATE TOKEN
      const payload = {
        id: checkAuthor.id,
      };

      // GET ACCESS TOKEN FROM .ENV FILE
      // env code : INIRAHASIABANGET
      const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

      // SEND DATA
      res.status(200).json({
        statusCode: 200,
        access_token,
        username: checkAuthor.username,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //? SIGN IN / SIGN UP
  // POST /google-signin
  static async googleSignIn(req, res, next) {
    try {
      // from ajax
      const { access_token } = req.body;

      // npm install google-auth-library --save
      // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
      const client = new OAuth2Client(process.env.CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: access_token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();

      const user = await Author.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: "passwordGoogle",
          role: "staff",
        },
        hooks: false, // TURNING OFF THE HOOKS
      });

      // THROW THE DATA
      const payload2 = {
        id: user[0].id,
      };

      const token = jwt.sign(payload2, process.env.ACCESS_TOKEN_SECRET);

      const username = payload.given_name;

      res.status(200).json({
        statusCode: 200,
        data: user,
        access_token: token,
        username,
      });
    } catch (error) {
      next(error);
    }
  }

  //? MODIFY MOVIE DATA
  // PATCH /movie
  static async modifyMovie(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const id = +req.params.id
      const { id: authorId , email} = req.author
    
      const findMovie = await Movie.findByPk(id)

      if (!findMovie) {
        throw { 
          statusCode : 404,
          message : `Movie with id ${id} does not exist`
        }
      }

      const updatedMovie = await Movie.update({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId
      }, {
        where : { id }
      });

      if (!updatedMovie) {
        throw { name : "MOVIE_UPDATE_FAILED" }  //!
      }

      // CREATE LOGS
      await History.create({
        name : "PUT",
        description : `entity with ${id} updated`,
        updatedBy : email
      })

      res.status(201).json({
        statusCode: 201,
        message: "MOVIE HAS BEEN UPDATED"
      });
    } catch (error) {
      next(error);
    }
  }

  //? REPLACE MOVIE STATUS
  // PUT /movie
  static async replaceMovieStatus(req, res, next) {
      try {
        const id = +req.params.id
        const { status } = req.body
        const { email } = req.author

        const findMovie = await Movie.findByPk(id)

        if (!findMovie) {
          throw { 
            statusCode : 404,
            message : `Movie with id ${id} does not exist`
          }
        }

        await Movie.update({
          status : status
        }, {
          where : { id }
        })

        // CREATE LOGS
        await History.create({
          name : "PUT",
          description : `entity with id ${id} has been updated from ${findMovie.status} into ${status}`,
          updatedBy : email    
        })

        res.status(201).json({
          statusCode: 201,
          message: "MOVIE STATUS HAS BEEN UPDATED"
        })

      } catch (err) {
        next(err)
      }
      
  }

  //? LOGS
  // GET /logs
  static async logs(req, res, next) {
    try {
      const logs = await History.findAll({
        order: [["id", "DESC"]],
      });

      res.status(200).json({
        statusCode: 200,
        message: "SUCCESS READ LOGS",
        logs,
      });
      
    } catch (error) {
      next(error);
    }
  }


  //!  ------------- FOR PUBLIC ------------- !//

  //? LOGIN
  // POST /pub/login
  static async loginPublic(req, res, next) {
    try {
      const { email, password } = req.body;

      // COMPARE EMAIL
      const checkAuthor = await Author.findOne({
        where: { email: email },
      });

      // CHECK AND THROW ERROR
      if (!checkAuthor) {
        throw { name: "EMAIL_INVALID" };
      }

      // COMPARE PASSWORD
      const checkPassword = bcrypt.compareSync(password, checkAuthor.password); // Output : TRUE / FALSE

      // CHECK AND THROW ERROR
      if (!checkPassword) {
        throw { name: "PASSWORD_INVALID" };
      }

      // CREATE TOKEN
      const payload = {
        id: checkAuthor.id,
      };

      // GET ACCESS TOKEN FROM .ENV FILE
      // env code : INIRAHASIABANGET
      const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

      // SEND DATA
      res.status(200).json({
        statusCode: 200,
        access_token,
        username: checkAuthor.username,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //? REGISTER PUBLIC
  // POST /pub/register
  static async registerPublic(req, res, next){
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const data = await Author.create({
        username,
        email,
        password,
        role: `customer`,
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: "AUTHOR HAS BEEN CREATED SUCCESSFULLY",
        data: {
          id: data.id,
          email: data.email,
          username: data.username,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  //? GOOGLE SIGN IN PUBLIC
  // POST /pub/google-signin
  static async googleSignInPublic(req, res, next){
    try {
      // from ajax
      const { access_token } = req.body;

      // npm install google-auth-library --save
      // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
      const client = new OAuth2Client(process.env.CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: access_token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();

      const user = await Author.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: "googlepassword",
          phoneNumber: "000000000",
          address: "google address",
          role: "customer",
        },
        hooks: false, // TURNING OFF THE HOOKS
      });

      // THROW THE DATA
      const payload2 = {
        id: user[0].id,
      };

      const token = jwt.sign(payload2, process.env.ACCESS_TOKEN_SECRET);

      const username = payload.given_name;

      res.status(200).json({
        statusCode: 200,
        data: user,
        access_token: token,
        username,
      });
    } catch (error) {
      next(error);
    }
  }

  //? READ ALL MOVIES PUBLIC
  // GET /pub/movies
  static async readMoviesPublic(req, res, next) {
    try {
      const pageAsNumber = Number.parseInt(req.query.page);
      const dataAsNumber = Number.parseInt(req.query.data);
      // DEFAULT PAGE NUMBER
      let page = 1;

      // CHECKING IF PAGE IS NUMBER 7 MORE THAN 0
      if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
      };

      // DEFAULT VALUE OF HOW MUCH DATA(S)
      let data = 8;

      // CHECKING IF
      if(!Number.isNaN(dataAsNumber) && dataAsNumber > 0 && dataAsNumber < 10) {
        data = dataAsNumber
      };

      const movies = await Movie.findAndCountAll({
        limit : data,
        offset : data * ( page - 1 ),
        include: [ Author, Genre ],
        order: [['id', 'ASC']],
        where: { status : 'Active' } 
      });
      
      res.status(200).json({
        message: "SUCCESS READ MOVIE DATA",
        totalPages : movies.count / data,
        content : movies.rows,
      });
      
    } catch (error) {
      next(error);
    }
  }

  //? MOVIE DETAIL PUBLIC
  // GET /pub/movie/:id
  static async movieDetailPublic(req, res, next) {
    try {
      const id = req.params.id;
      const movies = await Movie.findByPk(id, {
        include: [ Author ],
      });

      if (movies) {
        res.status(200).json({
          statusCode: 200,
          message: "SUCCESS READ DATA",
          // qrcode : QRCode.data.qrcode
          movies,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      next(error);
    }
  }

  //? READ ALL FAVOURITE
  // GET /pub/favourites
  static async readFavourite(req, res, next) {
    try {
      const favourites = await Favourite.findAll({
        include: Movie
      });
      res.status(200).json({
        statusCode: 200,
        message: "SUCCESS READ FAVOURITES DATA",
        favourites
      });

    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  //? ADD FAVORITE MOVIE
  // POST /pub/favourite/:id
  static async addBookmark(req, res, next) {
    try {
      const { id, email } = req.author
      const movieId = +req.params.id;

      const addedFav = await Favourite.create({
        AuthorId : id,
        MovieId : movieId
      });

      res.status(201).json({
        statusCode: 201,
        message: "FAVOURITE HAS BEEN CREATED"
      });
    } catch (error) {
      next(error);
    }

  }

  //! SEARCH BY GENRE
  // GET /pub/movie/genre/:id
  static async searchByGenre(req, res, next) {
    try {
      const genreId = req.params.id;
      
      const movies = await Movie.findByPk(genreId, {
        include: [ Genre ],
      });

      if (movies) {
        res.status(200).json({
          statusCode: 200,
          message: "SUCCESS READ DATA",
          movies,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      next(error);
    }
  }

}

module.exports = Controller;
