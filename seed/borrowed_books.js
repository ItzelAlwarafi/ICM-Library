const db = require('../db')
const borrowedbooks = require('../models/borrowedBooks')
const books =require('../models/Books')
const Clients = require('../models/clients')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () =>{
    try{

       const meetingMohammed = await books.find({title:'Meeting Muhammad'})
       console.log(meetingMohammed)
       const prayerOfPious = await books.find({title:'Prayers of the Pious'})
       console.log(prayerOfPious)
       const itzelAlwarafi = await Clients.find({name:'Itzel Alwarafi'})
       console.log(itzelAlwarafi)


       const borrowedBookList =[

        {
            member:itzelAlwarafi[0]._id,
            books_borrowed:[meetingMohammed[0]._id,prayerOfPious[0]._id],
            date_loanOut : '2024-02-14',
            date_return : '2024-05-14'
        }
       ]



        await borrowedbooks.insertMany(borrowedBookList)
    console.log("we have created some Borrowed books!")

} catch (error) {
    console.error("Error creating  Borrowed books:", error)
}
}
const run = async () => {
    await main()
    db.close()
}

run()

