const BwrdBooks = require('../models/borrowedBooks')


const getAllBorrowedBooks = async (req, res) => {
    try {
        const books = await BwrdBooks.find()
        res.json(books)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteAllBorrowedBooks = async () => {
    try {
        const result = await BwrdBooks.deleteMany() 
        return result.deletedCount
    } catch (error) {
        throw new Error(`Error deleting Books: ${error.message}`)
    }
}

const createBorrowedBooks = async(req,res) =>{
    try{
        console.log(req.body)
        const book =await new BwrdBooks(req.body)
        console.log(book)
        await book.save()
        return res.status(201).json({
            book,
        })

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

const updateBorrowedBooks = async (req, res) => {
    try {
        let { id } = req.params;
        let book = await BwrdBooks.findByIdAndUpdate(id, req.body, { new: true })
        if (book) {
            return res.status(200).json(book)
        }
        throw new Error("Borrowed Book not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const deleteBorrowedBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await BwrdBooks.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Borrowed Book deleted");
        }
        throw new Error("Borrowed Book not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const findBorrowedBooksbyId = async (req, res) => {
    try {
        const {id } = req.params
        const book = await BwrdBooks.find({ member: id })// Find movie by title
        if (!book) {
            return res.status(404).send('Book not found!')// If movie not found, send 404 response
        }
        res.json(book)// Send movie as JSON response
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error') // Send 500 response for any server errors
    }
}

module.exports ={
    getAllBorrowedBooks,
    deleteAllBorrowedBooks,
    createBorrowedBooks,
    updateBorrowedBooks,
    deleteBorrowedBook,
    findBorrowedBooksbyId

}