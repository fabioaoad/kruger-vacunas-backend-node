const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { vacunaPost,
    vacunaGet, vacunaDelete
} = require("../controllers/vacunas");

const {validarJWT, esAdminRole, tieneRole} = require("../middlewares");
const {tareasGet} = require("../controllers/tareas");
const {existeUsuarioPorId, existeVacunasPorId} = require("../helpers/db-validators");
const {usuariosDelete} = require("../controllers/usuarios");



const router = Router();


router.get('/',vacunaGet);


router.post('/', [
    validarJWT,
    check('vacunaNombre','El nombre de la vacuna es obligatorio').not().isEmpty(),
    check('fechaVacunacion','la fecha de la vacunacion es obligatorio').not().isEmpty(),
    check('dosisNumero','El numero de dosis de la vacuna es obligatorio').not().isEmpty(),
    validarCampos
],vacunaPost);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeVacunasPorId ),
    validarCampos
], vacunaDelete);






module.exports = router;
