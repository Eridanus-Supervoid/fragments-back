const Fragment = require('../models/Fragment')
const User = require('../models/User')

exports.getFragment = async(req, res) => {
    const fragment = await Fragment.findById(
        req.params.fragmentId
    ).populate('noteId')
    res.status(200).json({ fragment })
}

exports.getFragments = async(req, res) => {
    const { userId } = req.body
    const user = await User.findById(userId).populate('fragmentId')
    const userFragments = user.fragmentId
    res.status(200).json({ userFragments })
}

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