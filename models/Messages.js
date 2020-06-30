var mongoose = require("mongoose");

var MessagesSchema = new mongoose.Schema({
    name1:{
        type: String
    },
    name2:{
        type: String
    },
    messages:[{
        date:{
            type: Date,
            default: Date.now
        },
        Flag:{
            type: String
        },
        message:{
            type: String
        }
    }]
})

module.exports = Messages = mongoose.model("Messages", MessagesSchema);