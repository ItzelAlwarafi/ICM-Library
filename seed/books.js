const db = require('../db')
const books =require('../models/Books');
const Author =require('../models/Authors')


db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const main = async () =>{
try{
     const omarSuleiman = await Author.find({name:'Omar Suleiman'})
     console.log(omarSuleiman)
     const saidQahtani =await Author.find({name:'Saeed Qahtani'})
     console.log(saidQahtani)
     const syedAhmed = await Author.find({name:'Syed Taj Ahmed'})
     console.log(omarSuleiman)

const booksList =[


   {     title:'Meeting Muhammad',
         author:omarSuleiman[0]._id,
         publisher:'Kube Plublishing',
         quantity:10,
         loanOut:0,
         img: "../images/Meeting-Muhammad.webp" ,
    },
    {    title:'Prayers of the Pious',
        author:omarSuleiman[0]._id,
        publisher:'Kube Publisher',
        img:"../images/prayesofpious.jpg"
    

    },
    {
        title:'Fortress of the Muslim',
        author:saidQahtani[0]._id,
        publisher:'Darusalam',
        quantity:10,
        loanOut:0,
        img:"../images/fortress.jpg"
    },
    {
        title:'The Heights of Success',
        author:syedAhmed[0]._id,
        publisher:'Darusalam',
        quantity:10,
        loanOut:0,
        img:'../images/The_Heights_Of_Success_1.jpeg'

    },
  

]

await books.insertMany(booksList)
    console.log("we have created some books!")

} catch (error) {
    console.error("Error creating books:", error)
}
}
const run = async () => {
    await main()
    db.close()
}

run()