const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        fullName: {type: String, required: false},
        email: {type: String, required: true},
        displayName: {type: String, required: true},
        photo: {type: String, required: false},
        bio: {type: String, required: false},
        pins: {type: [mongoose.Schema.Types.ObjectId], required: false},
        liked: {type: [mongoose.Schema.Types.ObjectId], required: false},
        viewed: {type: [mongoose.Schema.Types.ObjectId], required: false},
        connections: {type: [mongoose.Schema.Types.ObjectId], required: false}
    }
)

const User = mongoose.model('User', userSchema, 'users')

module.exports = User