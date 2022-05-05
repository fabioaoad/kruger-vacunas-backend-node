const jwt = require('jsonwebtoken');
const {response, request} = require("express");

const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if ( !token ){
        return res.status(401).json({
           msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        // verificar que exista en DB
        if ( ! usuario ){
            return res.status(401).json({
                msg: 'Token no válido - usuario borrado DB'
            });
        }

        // verificar si el uid tiene estado en true
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }
        //console.log(usuario);
        req.usuario = usuario;
        next();
    }
    catch (error){
        console.log(error);
        res.status(401).json({
           msg: 'token no válido'
        });
    }


}

// const validarDuplicado = async (req, res = response, next) => {
//     const carpeta = await Carpeta.findById( uid );
//
//     next();
//
// }


module.exports = {
    validarJWT
}
