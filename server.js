const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')
const authorsControllers = require('./controllers/authorsController')
const booksControllers= require('./controllers/booksController')


const app = express()

app.use(bodyParser.json())

const PORT = process.env.PORT || 3001;

app.use(cors())

// app.use() middleware here ^ ///////////////////

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

app.get("/", (req, res) => res.send("This is our landing page!"))

//Auhtors 
//app.delete('/authors',authorsControllers.deleteAllAuthors)
app.get('/authors',authorsControllers. getAllAuthors)
app.get('/authors/:name',authorsControllers.getAuthorByName)
app.post('/auhtor',authorsControllers.createAuthor)
app.put('/authors/:id',authorsControllers.updateAuthor)
app.delete('/authors/:id',authorsControllers.deleteAuthor)
// books

//app.delete('/books',booksControllers.deleteAllBooks)
app.get('/books',booksControllers.  getAllBooks)
app.get('/books/:name',booksControllers.getBooksByName)
app.post('/book', booksControllers.createBook)
app.put('/books/:id', booksControllers. updateBook)
app.delete('/books/:id', booksControllers.deleteBook)