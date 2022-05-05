const { Router } = require('express');
const {check} = require("express-validator");
const { login, revalidarToken} = require("../controllers/auth");
const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares");


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


//validar y revalidar jwt
router.get('/renew', validarJWT, revalidarToken );



module.exports = router;
