var mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema({
    names:[],
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Rooms = mongoose.model("Rooms", RoomSchema);