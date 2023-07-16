const Router = require('express').Router()

const itinerariesControllers = require('../itinerariesControllers/itinerariesControllers')

const {getAllItineraries,addItinerary,getOneItinerary,removeItinerary,removeManyItineraries, addMultiplesItineraries, modifyItinerary,getItinerariesByCity} = itinerariesControllers

Router.route("/itineraries")
.get(getAllItineraries)
.delete(removeManyItineraries)
.post((req,res)=>{Array.isArray(req.body.data) ? addMultiplesItineraries(req,res):addItinerary(req,res)})

Router.route("/itineraries/:id")
.get(getOneItinerary)
.delete(removeItinerary)
.put(modifyItinerary)

Router.route("/itineraries/cities/:city_id")
.get(getItinerariesByCity)

module.exports= Router;