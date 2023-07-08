const mongoose = require ('mongoose')

const itinerariesSchema = new mongoose.Schema({
    
    city_id:{type:String, required:true}, 
    itineraryName:{type:String, required:true},
    collaborator: {type:String, required:true},
    profilePic: {type:String, required:true},
    price: {type:Number, required:true},
    duration: {type:String, required:true},
    hashtags: {type:String, required:true},
    likes: {type:Number, required:true},
    pictureUno: {type:String, required:true},
    pictureDos: {type:String, required:false},
    pictureDos: {type:String, required:false},
})
const Itineraries = mongoose.model("Itineraries", itinerariesSchema)
module.exports = Itineraries