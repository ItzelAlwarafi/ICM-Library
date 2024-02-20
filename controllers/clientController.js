const Clients = require('../models/Clients')


const getAllClients = async (req, res) => {
    try {
        const clients = await Clients.find()
        res.json(clients)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteAllClients = async () => {
    try {
        const result = await Clients.deleteMany() 
        return result.deletedCount
    } catch (error) {
        throw new Error(`Error deleting clients: ${error.message}`)
    }
}
const getClientByName = async (req, res) => {
    try {
        const { name } = req.params
        const client = await Clients.find({ name: name }) // Find movie by title
        if (!client) {
            return res.status(404).send('Client not found!')// If movie not found, send 404 response
        }
        res.json(client)// Send movie as JSON response
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error') // Send 500 response for any server errors
    }
}
const createClient = async(req,res) =>{
    try{
        const client =await new Clients(req.body)
        await client.save()
        return res.status(201).json({
            client,
        })

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

const updateClient = async (req, res) => {
    try {
        let { id } = req.params;
        let client = awaitClients.findByIdAndUpdate(id, req.body, { new: true })
        if (client) {
            return res.status(200).json(client)
        }
        throw new Error("Client not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Clients.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Client deleted");
        }
        throw new Error("Client not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



module.exports ={
    getAllClients,
    deleteAllClients,
    getClientByName,
    createClient,
    updateClient,
    deleteClient


}