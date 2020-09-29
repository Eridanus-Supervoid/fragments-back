const Fragment = require('../models/Fragment')
const axios = require("axios")

exports.getFragment = async(req, res) => {
    const fragment = await Fragment.findById(
        req.params.fragmentId
    ).populate('notesId')
    res.status(200).json({ fragment })
}

//TODO:Esto se puede hacer con una especie de getUser y populando.
// exports.getFragments = async(req, res) => {
//     const fragments = await Fragment.find()
//     res.status(200).json({ fragments })
// }

exports.createFragment = async(req, res) => {
    const { name, summary } = req.body
    const fragment = await Fragment.create({
        name,
        summary,
        userId: req.user.id
    })
    res.status(201).json({ fragment })
}

exports.updateFragment = async(req, res) => {
    const { name, summary } = req.body
    const { fragmentId } = req.params
    const fragment = await Fragment.findByIdAndUpdate(
        fragmentId, {
            name,
            summary
        }, { new: true }
    )
    res.status(200).json({ fragment })
}

exports.deleteFragment = async(req, res) => {
    const { fragmentId } = req.params
    await Fragment.findOneAndDelete(fragmentId)
    res.status(200).json({ message: 'deleted' })
}