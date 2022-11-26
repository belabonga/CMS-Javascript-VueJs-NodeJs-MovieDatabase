const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize
const jwt = require("jsonwebtoken");
require("dotenv").config();

jest.setTimeout(1000)

let access_token = '';
let payload;

// BEFORE ALL : SEEDING & SET ACCESS TOKEN
beforeAll(async () => {

    // SEED DATA MOVIES
    const movies = require("../data/movie.json");

    movies.forEach(movie => {
      delete movie.id;
      movie.status = "Active";
      movie.createdAt = new Date();
      movie.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Movies', movies, {})


    // SEED DATA GENRE
    const genres = require("../data/genre.json");

     genres.forEach(genre => {
      delete genre.id;
      genre.createdAt = new Date ();
      genre.updatedAt = new Date();
     });
    
    await queryInterface.bulkInsert('Genres', genres, {});


    // SEED DATA AUTHOR
    const authors = require("../data/author.json");

     authors.forEach(author => {
      delete author.id;
      author.password = hashSync(author.password, 10);
      author.createdAt = new Date ();
      author.updatedAt = new Date();

        payload = { id : author.id }
     });

    access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    
    await queryInterface.bulkInsert('Authors', authors, {});
})

// UNDO SEED ALL
afterAll(async() => {
    try {
        await queryInterface.bulkDelete('Movies', null, {
            truncate : true,
            restartIdentity : true,
            cascade : true
        })

        await queryInterface.bulkDelete('Authors', null, {
            truncate : true,
            restartIdentity : true,
            cascade : true
        });

        await queryInterface.bulkDelete('Favourites', null, {
            truncate : true,
            restartIdentity : true,
            cascade : true
        });

        await queryInterface.bulkDelete('Genres', null, {
            truncate : true,
            restartIdentity : true,
            cascade : true
        });
        
    } catch (error) {
        console.log(error);
    }
})

// ALL MOVIES
describe('GET /pub/movies', () => {
    describe('SUCCESS : GET ALL MOVIES', () => {
        it('return array of status code, message, total pages, and object(s) of movie', async () => {
            await request(app)
            .get('/pub/movies')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body.content).toBeInstanceOf(Array)
            })
        })
    })
})

// MOVIE DETAIL
describe('GET /pub/movies/:id', () => {
    describe('SUCCESS : GET MOVIE BY ID', () => {
        it('return array of status code, message, and object(s) of movie', async () => {
            await request(app)
            .get('/pub/movies/1')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("statusCode", expect.any(Number));
                expect(res.body).toHaveProperty("message", expect.any(String))
                expect(res.body).toBeInstanceOf(Array);
            })
        })
    })

    describe('FAILED', () => {
        it("FAILED : GET MOVIE BY ID"), async () => {
            await request(app)
            .get('/pub/movies/999')
            .then((res) => {
                expect(res.status).toBe(404);
                expect(res.body).toHaveProperty("message", expect.any(String))
            })
        }
    })
})

// ALL FAVOURITES
describe('GET /pub/favourites', () => {
    describe('SUCCESS : GET ALL FAVOURITES DATA', () => {
        it('return array of status code, message, and object(s) of favourites list', async () => {
            await request(app)
            .get('/pub/favourites')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body.favourites).toBeInstanceOf(Array)
            })
        })
    })
})

// ADD BOOKMARK
describe('GET /pub/favourites/:id', () => {
    describe('SUCCESS : ADDING MOVIE TO FAV LIST', () => {
        it('return array of status code, message, total pages, and object(s) of movie', async () => {
            await request(app)
            .post('/pub/favourites/1')
            .then((res) => {
                expect(res.status).toBe(201);
                expect(res.body).toBeInstanceOf(Object)
            })
        })
    });

    // ID NOT FOUND
    describe('FAILED : ADDING MOVIE TO FAV LIST', () => {
        it('id not found : 404', async () => {
            await request(app)
            .post('/pub/favourites/999')
            .set('access_token', access_token)
            .then((res) => {
                expect(res.status).toBe(404);
            })
        })
    });

    //! UNAUTHORIZED
    describe('FAILED : ADDING MOVIE TO FAV LIST', () => {
        it('Unauthorized : 401', async () => {
            await request(app)
            .post('/pub/favourites/1')
            .then((res) => {
                expect(res.status).toBe(401);
            })
        })
    });

    // INVALID TOKEN
    describe('FAILED : ADDING MOVIE TO FAV LIST', () => {
        it('Invalid Token : 403', async () => {
            await request(app)
            .post('/pub/favourites/1')
            .get('access_token', !access_token)
            .then((res) => {
                expect(res.status).toBe(403);
            })
        })
    });
    
})

// LOGIN
describe("POST /pub/login", () => {
    describe("SUCCESS : LOGIN CUSTOMER", () => {
      it("return access_token", async () => {
        await request(app)
        .post("/pub/login")
        .send({
          email: "xxx@email.com",
          password: "asdfghjkl",
        })
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty("access_token");
            expect(res.body).toHaveProperty("username");
        })
      });
    });
  
    describe("FAILED : VALIDATION LOGIN CUSTOMER", () => {
      it("INVALID PASSWORD / EMAIL", async () => {
        await request(app)
        .post("/pub/login")
        .send({
            email: "xxx@email.com",
            password: "asdfghjkl",
        })
        .then((res) => {
            expect(res.status).toBe(401);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty("message");
        });
      });
    });
});

// REGISTER
describe("POST /PUB/REGISTER", () => {
    describe("SUCCESS : REGISTER NEW CUSTOMER", () => {
      it("return id, email and username", async () => {
        await request(app)
        .post("/pub/register")
        .send({
          username: "xxx",
          email: "xxx@email.com",
          password: "asdfghjkl",
          role: "customer",
          phoneNumber: "1234567890",
          address: "jaksel",
        })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty("id");
            expect(res.body).toHaveProperty("email");
            expect(res.body).toHaveProperty("username");
        })
      });
    });
  
    describe("FAILED : VALIDATION REGISTER CUSTOMER", () => {
        
        // USERNAME
        it("USERNAME NULL", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                email: "xxx@email.com",
                password: "asdfghjkl",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Username is Required");
            })
        });
    
        it("USERNAME EMPTY", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                username: "",
                email: "xxx@email.com",
                password: "asdfghjkl",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Username is Required");
            })
        });
  
        // EMAIL
        it("EMAIL NULL", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                username: "xxx",
                password: "asdfghjkl",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) =>{
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Email is Required");
            });
        });
    
        it("EMAIL EMPTY", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                username: "xxx",
                email: "",
                password: "asdfghjkl",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Email is Required");
            })
        });
    
        it("EMAIL FORMAT", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                username: "xxx",
                email: "xxx",
                password: "asdfghjkl",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Please use right email format");
            })
        });
    
        it("EMAIL ALREADY EXIST", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                username: "xxx",
                email: "shan@email.com",
                password: "asdfghjkl",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Email has already registered");
            })
        });

        // PASSWORD
        it("PASSWORD NULL", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                username: "xxx",
                email: "xxx@email.com",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Password is Required");
            })
        });
    
        it("PASSWORD EMPTY", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                username: "xxx",
                email: "xxx@email.com",
                password: "",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Password is Required");
            })
        });

        it("PASSWORD MINIMUM CHARACTERS", async () => {
            await request(app)
            .post("/pub/register")
            .send({
                username: "xxx",
                email: "xxx@email.com",
                password: "asd",
                role: "customer",
                phoneNumber: "1234567890",
                address: "jaksel",
            })
            .then((res) => {
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("msg", "Minimum 5 characters required");
            })
        });
    });
  });
