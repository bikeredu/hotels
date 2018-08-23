'use strict'

const express = require('express')
const HotelCtrl = require('../controllers/hotel')
const api = express.Router()

//api.get('/hotel', HotelCtrl.getHotels)
api.get('/hotel', HotelCtrl.getHotel)
api.get('/hotel/stars', HotelCtrl.getHotelStars)
api.post('/hotel/', HotelCtrl.saveHotel)
api.put('/hotel/:hotelId', HotelCtrl.updateHotel)
api.delete('/hotel/:hotelId', HotelCtrl.deleteHotel)

module.exports = api