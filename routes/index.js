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

router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' });
});

router.post('/fragmentsFetch', catchErrors(getFragments))
router.post('/fragments', catchErrors(createFragment)) //MODAL
router.get('/fragments/:fragmentId', catchErrors(getFragment))
router.put('/fragments/:fragmentId', catchErrors(updateFragment)) //MODAL
router.delete('/fragments/:fragmentId', catchErrors(deleteFragment))

//TODO:RUTA PARA TODAS LAS NOTAS
router.get('/notes/:noteId', catchErrors(getNote)) //MODAL
router.post('/notes/:fragmentId', catchErrors(createNote)) //MODAL
router.put('/notes/:noteId', catchErrors(updateNote)) //MODAL
router.delete('/notes/:noteId', catchErrors(deleteNote)) //MODAL ANTERIOR

//MEANING CLOUD
//TODO:DIVIDIR EN CONTROLADOR
router.post("/summarize", async(req, res) => {
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
    console.log(data)
    res.send(data)
})

module.exports = router;