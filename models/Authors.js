const mongoose = require('mongoose')
const  { Schema } = require('mongoose')


const authorSchema = new Schema(
    {
        name: { type: String, required: true },
        Books:{ type:Schema.Types.ObjectId, ref:'Books_id'} 
    },
    { timestamps: true },
)

module.exports = mongoose.model('Authors', authorSchema)
