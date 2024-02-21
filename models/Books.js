const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const bookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: {type:Schema.Types.ObjectId, ref:'Authors_id'},
        publisher:{ type: String, required: true },
        quantity:{type:Number,requiered:true},
        loanOut:{type:Number,require: false},
        img: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Books', bookSchema)
