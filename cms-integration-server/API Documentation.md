# Movie App

## Endpoints : 
- GET /movie
- GET /movie/:id
- POST /movie
- DELETE /movie/:id  
- GET /genre
- POST /genre
- DELETE /genre/:id
- POST /login
- POST /register
- POST /google-signin
  
<br />
<br />

# GET /movie
## **Description :** 
To get all the movie datas
<br />
<br />
## **Required Information :** -
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")
```js
  {
    "statusCode": 200,
    "message": "Succeed display movie datas"
  }
```

<br />
<br />

Error : 404 ("Error not found")
```js
{
    "statusCode": 404,
    "error": {
      "message": "Error : Data not found"
    }
}
```

<br />
<br />

# GET /movie/:id
## **Description :** 
To get one movie data by id
<br />
<br />

## **Required Information :**
- id
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")  
```js
  {
    "statusCode": 200,
    "message": "Succeed display movie data"
  }
```
<br />
<br />

Error : 404 ("Id not found")
```js
  {
    "statusCode": 404,
    "error": {
      "message": "Movie not found"
    }
  }
```

<br />
<br />

# POST /movie
## **Description :** 
To create new movie data
<br />
<br />

## **Required Information :**
- Movie Title
- Synopsis
- Trailer URL
- Cover Image URL
- Rating (1-5)
- Genre
- Author
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")  
```js
  {
    "statusCode": 200,
    "message": "Succeed adding new movie"
  }
```

Error :
- 400 ("Bad Request") : if the required information not completed
```js
{
    "statusCode": 400,
    "error": {
      "message": "All input data are required"
    }
}
```

<br />
<br />

- 500 ("Internal Server Error")

```js
{
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
}
```

<br />
<br />

# DELETE /movie/:id
## **Description :** 
To delete movie by id
<br />
<br />

## **Required Information :**
- id
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")  
```js
  {
    "statusCode": 200,
    "message": "Succeed adding new movie"
  }
```

Error :
- 400 ("Bad Request") : if the required information not completed or id not found
```js
{
    "statusCode": 400,
    "error": {
      "message": "ID not found"
    }
}
```
<br />
<br />

- 500 ("Internal Server Error")
```js
{
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
}
```
</br>
</br> 

# GET /genre
## **Description :** 
To get all the genre datas
<br />
<br />
## **Required Information :** -
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")
```js
  {
    "statusCode": 200,
    "message": "Succeed display genre datas"
  }
```

<br />
<br />

Error : 404 ("Error not found")
```js
{
    "statusCode": 404,
    "error": {
      "message": "Error : Data not found"
    }
}
```

<br />
<br />


# POST /genre
## **Description :** 
To create new genre data
<br />
<br />

## **Required Information :**
- Genre Name

<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")  
```js
  {
    "statusCode": 200,
    "message": "Succeed adding new genre"
  }
```

Error :
- 400 ("Bad Request") : if the required information not completed
```js
{
    "statusCode": 400,
    "error": {
      "message": "All input data are required"
    }
}
```

<br />
<br />

- 500 ("Internal Server Error")

```js
{
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
}
```

<br />
<br />

# DELETE /genre/:id
## **Description :** 
To delete genre by id
<br />
<br />

## **Required Information :**
- id
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")  
```js
  {
    "statusCode": 200,
    "message": "Succeed delete genre"
  }
```

Error :
- 400 ("Bad Request") : if the required information not completed or id not found
```js
{
    "statusCode": 400,
    "error": {
      "message": "ID not found"
    }
}
```
<br />
<br />

- 500 ("Internal Server Error")
```js
{
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
}
```


# POST /login
## **Description :** 
Default login author
<br />
<br />

## **Required Information :**
- email
- password
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")  
```js
  {
    "statusCode": 200,
    "message": "Succeed Login"
  }
```

Error :
- 400 ("Bad Request") : if the required information not completed or id not found
```js
{
    "statusCode": 400,
    "error": {
      "message": "Invalid email / password"
    }
}
```
<br />
<br />

- 500 ("Internal Server Error")
```js
{
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
}
```


# POST /google-signin
## **Description :** 
Login / Sign In / Sign Up author via Google (by default as staff)
<br />
<br />

## **Required Information :**
- Google email
- Password
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")  
```js
  {
    "statusCode": 200,
    "message": "Succeed Login"
  }
```

Error :
- 400 ("Bad Request") : if the required information not completed or id not found
```js
{
    "statusCode": 400,
    "error": {
      "message": "Invalid email / password"
    }
}
```
<br />
<br />

- 401 ("Access Token Not Found") : if the access token is invalid
```js
{
    "statusCode": 401,
    "error": {
      "message": "Token Invalid"
    }
}
```
<br />
<br />

- 500 ("Internal Server Error")
```js
{
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
}
```


# POST /register
## **Description :** 
Register author (by default as admin)
<br />
<br />

## **Required Information :**
- Username
- Email
- Password
- Phone Number
- Address
<br />
<br />

## **Response Code :** 
Succeed : 200 ("Request has succeeded")  
```js
  {
    "statusCode": 200,
    "message": "Succeed Register"
  }
```

Error :
- 400 ("Bad Request") : if the required information not completed or id not found
```js
{
    "statusCode": 400,
    "error": {
      "message": "Invalid email / password"
    }
}
```
<br />
<br />

- 500 ("Internal Server Error")
```js
{
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
}
```