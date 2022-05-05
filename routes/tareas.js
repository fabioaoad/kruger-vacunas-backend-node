const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { tareasGet,
        tareasPut,
        tareasCompletadaPut,
        tareasPost,
        tareasDelete
} = require("../controllers/tareas");

const {validarJWT, esAdminRole } = require("../middlewares");
const {existeTareaPorId } = require("../helpers/db-validators");


const router = Router();

router.get('/',tareasGet);


router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeTareaPorId ),
    validarCampos
],tareasPut);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeTareaPorId ),
    validarCampos
],tareasCompletadaPut);

router.post('/', [
    validarJWT,
    check('nombreTarea','El nombre de la tarea es obligatorio').not().isEmpty(),
    validarCampos
],tareasPost);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeTareaPorId ),
    validarCampos
],tareasDelete);






module.exports = router;
