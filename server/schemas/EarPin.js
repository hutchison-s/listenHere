const mongoose = require("mongoose")

const pinSchema = new mongoose.Schema(
    {
        timestamp: {type: Date, default: Date.toString},
        latlng: {type: [Number], required: true},
        title: {type: String, required: true},
        desc: {type: String, required: false},
        tags: [String],
        creator: {type: mongoose.Schema.Types.ObjectId, required: true},
        likedBy: [mongoose.Schema.Types.ObjectId],
        viewedBy: [mongoose.Schema.Types.ObjectId],
        viewLimit: {type: Number, required: false},
        data: {type: Buffer, required: true}
    }
)

const EarPin = mongoose.model('EarPin', pinSchema, 'pins')

module.exports = EarPin