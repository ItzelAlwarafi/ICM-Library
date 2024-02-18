const db = require('../db')
const Author =require('../models/Authors')
const books =require('../models/Books')



db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

    try {
        

        const authors =[
            {
                name:'Omar Suleiman',
                
            },
            {
                name:'Saeed Qahtani',
               
            },
            {
                name:'Syed Taj Ahmed',
               
            }
        ]

       

        await Author.insertMany(authors)
        console.log("we have created some Authors!")
    
    } catch (error) {
        console.error("Error creating Authors:", error)
    }
    };
    const run = async () => {
        await main()
        db.close()
    }
    
    run()