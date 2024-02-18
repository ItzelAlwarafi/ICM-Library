const db = require('../db')
const Clients = require('../models/clients')



db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const main = async () => {

    try {

        const clients =[

            {
              name:'Itzel Alwarafi',
              phone_number:245-510-5244,
              email:'itzel@fake.com',
              Books:[]
            },
           
        ]

        await Clients.insertMany(clients)
        console.log("we have created some Clients!")
    
    } catch (error) {
        console.error("Error creating Clients:", error)
    }
    };
    const run = async () => {
        await main()
        db.close()
    }
    
    run()