const router = require('express').Router();
const { catchErrors } = require('../middlewares')
const Fragment = require('../models/Fragment')
const axios = require("axios")
const User = require('../models/User')
const {
    getFragments,
    getFragment,
    createFragment,
    updateFragment,
    deleteFragment,
} = require('../controllers/fragment')
const {
    getNote,
    createNote,
    updateNote,
    deleteNote
} = require('../controllers/note')


router.get('api/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' });
});

router.post('api/fragmentsFetch', catchErrors(getFragments))
router.post('api/fragments', catchErrors(createFragment)) //MODAL
router.get('api/fragments/:fragmentId', catchErrors(getFragment))
router.put('api/fragments/:fragmentId', catchErrors(updateFragment)) //MODAL
router.delete('api/fragments/:fragmentId', catchErrors(deleteFragment))

//TODO:RUTA PARA TODAS LAS NOTAS
router.get('api/notes/:noteId', catchErrors(getNote)) //MODAL
router.post('api/notes/:fragmentId', catchErrors(createNote)) //MODAL
router.put('api/notes/:noteId', catchErrors(updateNote)) //MODAL
router.delete('api/notes/:noteId', catchErrors(deleteNote)) //MODAL ANTERIOR

//MEANING CLOUD
//TODO:DIVIDIR EN CONTROLADOR
router.post("api/summarize", async(req, res) => {
    const { txt, sentences, name, user } = req.body
    const { _id } = user
    const { data } = await axios.post(
        `https://api.meaningcloud.com/summarization-1.0?key=${process.env.MC}&txt=${encodeURI(
            txt
        )}&sentences=${sentences}`
    )
    const { summary } = data
    const newFragment = await Fragment.create({
        name: name,
        summary,
        userId: _id
    })
    await User.findByIdAndUpdate(_id, { $push: { fragmentId: newFragment._id } }, { new: true })
    console.log(newFragment)
    res.send(newFragment)
})


module.exports = router;