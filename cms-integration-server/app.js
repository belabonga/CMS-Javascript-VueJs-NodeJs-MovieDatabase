if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express()
const route = require('./routes/route');
const cors = require('cors');

app.use(cors())

//FOR req.body
app.use(express.urlencoded({ extended : false }))
app.use(express.json());

app.use('/', route)


// CHECK CONNECTION
// BUT THIS ONE IS ALREADY MOVED TO .sequelizerc file
// const port = process.env.PORT || 3000
// app.listen(port, () => console.log('running in the deep on port : ', port));


// EXPORT FOR TESTING PURPOSE
module.exports = app