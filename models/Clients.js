const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const clientSchema = new Schema(
    {
        name: { type: String, required: true },
        phone_number: {type:Number,require:true},
        email:{ type: String, required: true },
        Books:[{type:Schema.Types.ObjectId,ref:'borrowedBooks_id'}]
    },
    { timestamps: true },
)

module.exports = mongoose.model('Clients',  clientSchema)