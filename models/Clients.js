const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const clientSchema = new Schema(
    {
        title: { type: String, required: true },
        author: {type:Schema.Types.ObjectId, ref:'Authors_id'},
        publisher:{ type: String, required: true },
        image: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Clients',  clientSchema)