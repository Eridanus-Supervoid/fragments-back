const Note = require("../models/Note")
const Fragment = require("../models/Fragment")

exports.getNote = async(req, res) => {
    const note = await note.findById(req.params.noteId)
    res.status(200).json({ note })
}

exports.createNote = async(req, res) => {
    const { fragmentId } = req.body
    const note = await Note.create({
        ...req.body,
        fragmentId: fragmentId
    })
    await Fragment.findByIdAndUpdate(fragmentId, { $push: { noteId: note } })
    res.status(201).json({ note })
}

exports.updateNote = async(req, res) => {
    const { noteId } = req.params
    const note = await Note.findByIdAndUpdate(
        noteId, {...req.body }, { new: true }
    )
    res.status(200).json({ note })
}

exports.deleteNote = async(req, res) => {
    const { noteId } = req.params
    console.log(noteId)
    await Note.findByIdAndRemove(noteId)
    res.status(200).json({ message: "deleted" })
}