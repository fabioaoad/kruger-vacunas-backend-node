const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptsj = require('bcryptjs');

const usuariosGet = async (req, res= response) => {

   const { limite = 5, desde = 0 } = req.query;
   const query = { estado: true };

   const [ total, usuarios ] = await Promise.all([
       Usuario.countDocuments(query),
       Usuario.find(query)
           .skip(Number(desde))
           .limit(Number(limite))
   ]);

    res.json({
        usuarios
    });

}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol, apellido, celular, fechaNac, direccion, dni } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol, apellido, celular, fechaNac, direccion, dni });

    //Encriptar la contraseña
    const salt = bcryptsj.genSaltSync();
    usuario.password = bcryptsj.hashSync( password, salt );

    //guardar en BD
    await usuario.save();
    res.json({
        ok: true,
        msg: 'post usuario API - controlador',
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra BD

    if( password ){
        //Encriptar la contraseña
        const salt = bcryptsj.genSaltSync();
        resto.password = bcryptsj.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API usuario - controlador',
        usuario
    });
}

const usuariosDelete =  async (req, res) => {
    const { id } = req.params;
    // Borrado fisico
    // const usuario = await Usuario.findByIdAndDelete( id );
    // res.json({
    //         usuario
    //      });

    // Borrado logico
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    res.json({
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
