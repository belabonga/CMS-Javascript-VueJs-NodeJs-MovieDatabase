class Error {
    static async Error (err, req, res, next) {
        console.log(err);
        //? 400
        if (
            err.name === "SequelizeUniqueConstraintError" ||
            err.name === "SequelizeValidationError" ||
            err.name === 400
            ){
                const errors = err.errors.map(el => el.message);
            res.status(400).json({
                statusCode : 400,
                message : errors
            })  

        //? 401 : Global                
        } else if (err.statusCode === 401) {
            res.status(401).json({
                statusCode : 401,
                message : err.message
        })

        //? 403 : Global                
        } else if (err.statusCode === 403) {
            res.status(403).json({
                statusCode : 403,
                message : err.message
        })

        //? 404 : Global                
        } else if (err.statusCode === 404) {
            res.status(404).json({
                statusCode : 404,
                message : err.message
        })
        
        //? AUTHORIZATION
        //? 401 : Access Token Not Found (Unauthorized) 
        } else if (err.name === "ACCESS_TOKEN_NOT_FOUND") {
            res.status(401).json({ 
                statusCode  : 401,
                message : "Token Invalid"
            })
        

        //? 401 :  JWT Token unmatch
        } else if (err.name === "INVALID_TOKEN") {
            res.status(401).json({ 
                statusCode  : 401,
                message : "Incorrect Token"
            })


        //? 401 : Token Invalid  
        } else if (err.name === "INVALID_AUTHOR") {
            res.status(401).json({ 
                statusCode  : 401,
                message : "Author not found"
        })
        
        
        //? LOGIN PAGE
        //? 401 : Invalid Email                
        } else if (err.name === "EMAIL_INVALID") {
            res.status(401).json({
                statusCode : 401,
                message : "Invalid Email Address"
        })

        
        //? 401 : Invalid Password                 
        } else if (err.name === "PASSWORD_INVALID") {
            res.status(401).json({
                statusCode : 401,
                message : "Password is Incorrect"
        })
        

        //? 403 : Forbidden
        } else if (err.name === "ACCESS_DENIED") {
            res.status(403).json({
                statusCode : 403,
                message : "You do not have permission"
            })
        

        //? 404 : DATA NOF FOUND
        } else if (err.name === "MOVIE_NOT_FOUND") {
            res.status(404).json({
                statusCode : 404,
                message : "Movie not found"
            })
       
        
        //? DEFAULT
        //? 500
        } else {
            res.status(500).json({
                statusCode : 500,
                message : "Internal Server Error"
            })
        }
    }
}

module.exports = Error