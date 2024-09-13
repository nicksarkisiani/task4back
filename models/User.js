const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isBlocked: {type: Boolean, default: false},
    registration_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
})

module.exports = model("User", UserSchema)