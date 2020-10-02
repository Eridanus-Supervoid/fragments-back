const { Schema, model } = require("mongoose")

const fragmentSchema = new Schema({
    name: String,
    summary: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    noteId: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
}, {
    timestamps: true
})

module.exports = model("Fragment", fragmentSchema)