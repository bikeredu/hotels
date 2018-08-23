'user strict'
const Hotel = require('../models/hotel')

function getHotel(req, res){
    let dataHotel = req.query.name
    console.log(dataHotel)
    Hotel.find({ name: new RegExp(dataHotel, 'i') }, (err, hotel) => {
        if(err) return res.status(500).send({message: `Error al reaizar la petición: ${err}`})
        if(!hotel) return res.status(404).send({message: `El hotel no existe`})
        res.status(200).send(hotel)
    })
}
function getHotelStars(req, res){
    dataHotel = req.query.stars
    Hotel.find({stars:dataHotel}, (err, hotel) => {
        if(err) return res.status(500).send({message: `Error al reaizar la petición: ${err}`})
        if(!hotel) return res.status(404).send({message: `El hotel no existe`})
        res.status(200).send( hotel );
    })
}
function getHotels(req, res) {
    Hotel.find({}, (err, hotels)=>{
        if(err) return res.status(500).send({message: `Error al reaizar la petición: ${err}`})
        if(!hotels) return res.status(404).send({message: `El Hotel no existe`})
        res.status(200).send(hotels)
    })
}
function saveHotel(req, res) {
    console.log('POST /api/hotel')
    console.log(req.body)
    let hotel = new Hotel()
    hotel.name = req.body.name
    hotel.stars = req.body.stars
    hotel.price = req.body.price
    hotel.image = req.body.image
    hotel.amenities = req.body.amenities
    hotel.save((err, hotelStored) =>{
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
    res.status(200).send({hotel: hotelStored})
})
}
function updateHotel(req, res) {
    let hotelId = req.params.hotelId
    let update = req.body
    Hotel.findByIdAndUpdate(hotelId, update, (err, hotelUpdated) =>{
        if(err) return res.status(500).send({message: `Error al actualizar hotel: ${err}`})
        res.status(200).send({ hotel: hotelUpdated })
})
}

function deleteHotel(req, res) {
    let hotelId = req.params.hotelId
    Hotel.findById(hotelId, (err, hotel) => {
        if(err) return res.status(500).send({message: `Error al borrar hotel: ${err}`})

        hotel.remove(err =>{
            if(err) return res.status(500).send({message: `Error al borrar hotel: ${err}`})
            res.status(200).send({message: 'El hotel ha sido eliminado'})
        })
    })
}

module.exports = {
    getHotel,
    getHotelStars,
    getHotels,
    saveHotel,
    updateHotel,
    deleteHotel
}