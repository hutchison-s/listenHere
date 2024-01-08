const mongoose = require("mongoose")

const pinSchema = new mongoose.Schema(
    {
        creator: {
            id: {type: mongoose.Schema.Types.ObjectId, required: true},
            displayName: {type: String, required: true}
        },
        title: {type: String, required: true},
        timestamp: {type: Number, required: true},
        latlng: {
            lat: {type: Number, required: true}, 
            lng: {type: Number, required: true}
        },        
        desc: {type: String, required: false},
        tags: {type: [String], required: false},
        likedBy: {type: [mongoose.Schema.Types.ObjectId], required: false},
        viewedBy: {type: [mongoose.Schema.Types.ObjectId], required: false},
        viewLimit: {
            isLimited: {type: Boolean, required: false},
            limit: {type: Number, required: false}
        },
        data: {type: String, required: true}
    }
)

const EarPin = mongoose.model('EarPin', pinSchema, 'pins')

module.exports = EarPin