const mongoose = require('mongoose')

const shortid = require('shortid')

const Schema = mongoose.Schema

const shortUrlSchema = new Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        require:true,
        default:shortid.generate
    },
    clicks:{
        type:Number,
        replace:true,
        default:0
    }
})

module.exports = mongoose.model('shorturl',shortUrlSchema)