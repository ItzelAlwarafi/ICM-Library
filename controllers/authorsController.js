const Authors = require('../models/Authors')


const getAllAuthors = async (req, res) => {
    try {
        const authors = await Authors.find()
        res.json(authors)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteAllAuthors = async () => {
    try {
        const result = await Authors.deleteMany() 
        return result.deletedCount
    } catch (error) {
        throw new Error(`Error deleting Directions: ${error.message}`)
    }
}
const getAuthorByName = async (req, res) => {
    try {
        const { name } = req.params
        const author = await Authors.find({ name: name }) // Find movie by title
        if (!author) {
            return res.status(404).send('Author not found!')// If movie not found, send 404 response
        }
        res.json(author)// Send movie as JSON response
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error') // Send 500 response for any server errors
    }
}
const createAuthor = async(req,res) =>{
    try{
        const author =await new Authors(req.body)
        await author.save()
        return res.status(201).json({
            author,
        })

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

const updateAuthor = async (req, res) => {
    try {
        let { id } = req.params;
        let author = await Authors.findByIdAndUpdate(id, req.body, { new: true })
        if (author) {
            return res.status(200).json(author)
        }
        throw new Error("Author not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Books.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Author deleted");
        }
        throw new Error("Author not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



module.exports ={
    getAllAuthors,
    deleteAllAuthors,
    getAuthorByName,
    createAuthor,
    updateAuthor,
    deleteAuthor


}