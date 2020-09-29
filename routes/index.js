const router = require('express').Router();
const { catchErrors } = require('../middlewares')
const {
    getFragment,
    createFragment,
    updateFragment,
    deleteFragment
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

//TODO:RUTA PARA TODOS LOS FRAGMENTOS
router.get('/fragments/:fragmentId', catchErrors(getFragment))
router.post('/fragments/', catchErrors(createFragment)) //MODAL
router.put('/fragments/:fragmentId', catchErrors(updateFragment)) //MODAL
router.delete('/fragments/:fragmentId', catchErrors(deleteFragment))

//TODO:RUTA PARA TODAS LAS NOTAS
router.get('/notes/:noteId', catchErrors(getNote)) //MODAL
router.post('/notes/:fragmentId', catchErrors(createNote)) //MODAL
router.put('/notes/:noteId', catchErrors(updateNote)) //MODAL
router.delete('/notes/:noteId', catchErrors(deleteNote)) //MODAL ANTERIOR

module.exports = router;