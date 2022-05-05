const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { carpetasGet,
        carpetasPut,
        carpetasPost,
        carpetasDelete,
        obtenerCarpeta
} = require("../controllers/carpetas");

const {validarJWT, esAdminRole, tieneRole} = require("../middlewares");
const { existeCarpetaPorId, existeUsuarioPorId} = require("../helpers/db-validators");


const router = Router();

router.get('/',carpetasGet);

router.get('/:id',[
    check('id', 'No es un ide de Mongo válido').isMongoId(),
    check('id').custom( existeCarpetaPorId ),
    validarCampos
],obtenerCarpeta);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCarpetaPorId ),
    validarCampos
],carpetasPut);

router.post('/', [
    validarJWT,
    check('nombreCarpeta','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],carpetasPost);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCarpetaPorId ),
    validarCampos
], carpetasDelete);






module.exports = router;
