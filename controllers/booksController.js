const Books = require('../models/Books')


const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find()
        res.json(books)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteAllBooks = async () => {
    try {
        const result = await Books.deleteMany() 
        return result.deletedCount
    } catch (error) {
        throw new Error(`Error deleting Books: ${error.message}`)
    }
}
const getBooksByName = async (req, res) => {
    try {
        const { name } = req.params
        const book = await Books.find({ title: name }) // Find movie by title
        if (!book) {
            return res.status(404).send('Book not found!')// If movie not found, send 404 response
        }
        res.json(book)// Send movie as JSON response
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error') // Send 500 response for any server errors
    }
}

const createBook = async(req,res) =>{
    try{
        const book =await new Books(req.body)
        await book.save()
        return res.status(201).json({
            book,
        })

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

const updateBook = async (req, res) => {
    try {
        let { id } = req.params;
        let book = await Books.findByIdAndUpdate(id, req.body, { new: true })
        if (book) {
            return res.status(200).json(book)
        }
        throw new Error("Book not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Books.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Book deleted");
        }
        throw new Error("Book not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports ={
    getAllBooks,
    deleteAllBooks,
    getBooksByName,
    createBook,
    updateBook,
    deleteBook

}