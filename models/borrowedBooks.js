const mongoose = require('mongoose')
const  { Schema } = require('mongoose')


const borrowedBooksSchema = new Schema (
    
    {
        member: {type:Schema.Types.ObjectId,ref: 'Clients_id'},
        books_borrowed:[ {type:Schema.Types.ObjectId, ref : 'Books_id'}],
        date_loanOut : { type:Date , required : true ,},
        date_return : {type:Date,required : true},


    },
    { timestamps: true },
)



module.exports = mongoose.model('borrowedBooks', borrowedBooksSchema)