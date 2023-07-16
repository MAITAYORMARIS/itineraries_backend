const Itineraries = require('../models/itinerariesModel')

const itinerariesControllers = {
    getAllItineraries: async (req, res) => {
        let itineraries
        let error = null

        try {
            itineraries = await Itineraries.find()
        }
        catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itineraries.find({ _id: id })
        }
        catch (err) { error = err }
        console.log(itinerary)
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    addItinerary: async (req, res) => {
        const { city_id, name, collaborator, profilePic, price, duration, description, hashtags, likes, image, origen, transportation,placesToVisit, activities } = req.body.data

        let itinerary
        let error = null

        try {
            let itineraryExist = await Itineraries.find({ name: { $regex: name, $options: "i" } })
            if (itineraryExist.length == 0) {
                itinerary = await new Itineraries({
                    city_id: city_id,
                    name: name,
                    collaborator: collaborator,
                    profilePic: profilePic,
                    price: price,
                    duration: duration,
                    description:description,
                    hashtags: hashtags,
                    likes: likes,
                    image: image,
                    origen: origen,
                    transportation: transportation,
                    placesToVisit: placesToVisit,
                    activities: activities
                }).save()
            } else {
                error = "El itinerario ya existe en BD con el id:" + itineraryExist[0]._id + "ingresó por ADD ONE ITINERARY"
            }
        }
        catch (err) { error = err }
        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })

    },

    addMultiplesItineraries: async (req, res) => {
        const itineraries = []
        let error = []

        for (let itinerary of req.body.data) {
            try {
                let itineraryExist = await Itineraries.find({ name: { $regex: itinerary.name, $options: "i" } })
                if (itineraryExist.length == 0) {

                    let dataItinerary = {
                        city_id: itinerary.city_id,
                        name: itinerary.name,
                        collaborator: itinerary.collaborator,
                        profilePic: itinerary.profilePic,
                        price: itinerary.price,
                        duration: itinerary.duration,
                        description:itinerary.description,
                        hashtags: itinerary.hashtags,
                        likes: itinerary.likes,
                        image: itinerary.image,
                        origen: itinerary.origen,
                        transportation: itinerary.transportation,
                        placesToVisit: itinerary.placesToVisit,
                        activities: itinerary.activities
                    }

                    await new Itineraries({
                        ...dataItinerary
                    }).save()
                    itineraries.push(dataItinerary)

                } else {
                    error.push({
                        name: itinerary.name,
                        result: "El itinerario" + "ya existe en BD con el id" + itineraryExist[0]._id
                    })
                }
            }
            catch (err) { error.push(err) }
        }

        res.json({
            response: error.length > 0 && itineraries.length === 0 ? "ERROR" : itineraries,
            success: error.length > 0 ? (itineraries.length > 0 ? "warning" : false) : true,
            error: error
        })

    },

    modifyItinerary: async (req,res) => {
        const id = req.params.id
        const dataItinerary = req.body.data

        let itinerary
        let error = null
        try {
            itinerary = await Itineraries.findOneAndUpdate({ _id: id }, dataItinerary, { new: true })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })
     },

    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itineraries.findOneAndDelete({ _id: id })
        }
        catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerary ? itinerary : "NO SE ENCONTRO EL ID DEL ITINERARIO A ELIMINAR",
            success: error ? false : itinerary ? true : false,
            error: error
        })

    },
    removeManyItineraries: async (req, res) => {
        const id = req.body.id
        itinerariesDelete=[]
        let error = []

        for(let id of data){
            try {
                let itinerary
               itinerary = await Itineraries.findOneAndDelete({ _id: id })
                if (itinerary){
                    itinerariesDelete.push(itinerary)
                }else{
                    error.push({
                        id:id,
                        error: "no se encontro el ID del itinerario a eliminar"
                    })
                }
            } catch(err) {error.push(err)}
        }
       

        res.json({
            response: error.length > 0 && itinerariesDelete.length === 0 ? "ERROR" : itinerariesDelete,
            success: error.length > 0 ? (itinerariesDelete.length > 0 ? "warning" : false) : true,
            error: error
        })
    },

    getItinerariesByCity: async (req, res) => {
        const cityId = req.params.city_id;
        let itineraries;
        let error = null;

        try {
            itineraries = await Itineraries.find({ city_id: cityId })
        }
        catch (err) { error = err}
           
        res.json({
          
            response: error ? 'ERROR EN LA CONSULTA' : {itineraries},
            success: error ? false : true,
            error: error
        })
    },
}

module.exports = itinerariesControllers;

