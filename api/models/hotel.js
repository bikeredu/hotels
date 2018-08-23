'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HotelSchema = Schema({
    name: String,
    stars: Number,
    price: Number,
    image: String,
    amenities: Array
})
module.exports = mongoose.model('Hotel', HotelSchema)