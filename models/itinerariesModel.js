const mongoose = require ('mongoose')
// const SchemaTypes = require ('mongoose').Schema.Types

const itinerariesSchema = new mongoose.Schema({
    
    city_id:{type:mongoose.Schema.Types.ObjectId, required:true}, 
    name:{type:String, required:true},
    collaborator: {type:String, required:true},
    profilePic: {type:String, required:true},
    price: {type:Number, required:true},
    duration: {type:String, required:true},
    hashtags: {type:String, required:true},
    likes: {type:Number, required:true},
    image: {type:String, required:true},
    origen: {type:String, required:true},
    placesToVisit: {type:Array, required:true},
    activities:{type:Object, required:true}
})
const Itineraries = mongoose.model("Itineraries", itinerariesSchema)
module.exports = Itineraries