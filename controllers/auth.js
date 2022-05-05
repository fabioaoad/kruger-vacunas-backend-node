const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

    const {correo, password} = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - correo ',
                ok: "false"
            });
        }

        // Verificar si el usuario esta activo
        if( !usuario.estado){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - estado false ',
                ok: "false"
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario/Password no son correctos - password ',
                ok: "false"
            });
        }
        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
           usuario,
            token,
            ok: "true"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el administrador',
            ok: "false"
        });
    }


}




const revalidarToken = async (req, res = response) => {
    try {
        const { _id, nombre } = req.usuario;

        // Leer la BD
        const dbUser = await Usuario.findById(_id);

        // Generar el JWT
        const token = await generarJWT( _id );

       return res.json({
            ok: true,
            msg: 'Renew',
            token,
            _id,
            nombre,
           correo: dbUser.correo,
           rol: dbUser.rol,
           apellido: dbUser.apellido
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el administrador',
            ok: "false"
        });
    }
}





module.exports = {
    login,
    revalidarToken
}
