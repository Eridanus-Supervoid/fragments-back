const { Schema, model } = require("mongoose")

const noteSchema = new Schema({
    name: String,
    summary: String,
    fragmentId: {
        type: Schema.Types.ObjectId,
        ref: "Fragment"
    }
}, {
    timestamps: true
})

module.exports = model("Note", noteSchema)