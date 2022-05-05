const { response } = require('express');
const { Carpeta } = require('../models')
const Usuario = require("../models/usuario");


const carpetasGet = async (req, res= response) => {
    const  usuario  = req.body.usuario.toString();
    console.log(usuario)
    const { limite = 100, desde = 0 } = req.query;
    const query = { estado: true, usuario };

    const [ total, carpetas ] = await Promise.all([
        Carpeta.countDocuments(query),
        Carpeta.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        carpetas
    });

}


const obtenerCarpeta = async (req, res = response) => {

    const { id } = req.params;
    const carpeta = await  Carpeta.findById( id )
        .populate('usuario', 'nombre');

    res.json( carpeta );

}

const carpetasPost = async (req, res=response) => {
    const  nombreCarpeta  = req.body.nombreCarpeta;
    console.log(nombreCarpeta);
    //const  carpetaDB = await Carpeta.findOne({ nombreCarpeta });
    //console.log('CARPETADB: ',carpetaDB);
    const  usuario = req.usuario._id.toString();
    console.log(usuario);
    //const  usuarioDB = await Carpeta.findOne({ usuario });
   // console.log(usuarioDB)
    const  datos = await Carpeta.find({ usuario, nombreCarpeta });
    console.log('los datos son: ',datos);
    console.log('los length datos son: ',datos.length);



    if ( datos.length !== 0 ){
        return res.status(400).json({
            msg: `La carpeta ya existe - 1`
        });
    }

    if (  datos.hasOwnProperty("nombreCarpeta")){
        return res.status(400).json({
            msg: `La carpeta ya existe - 2`
        });
    }

    //genero la data a guardar
    const data = {
        nombreCarpeta,
        usuario: req.usuario._id
    }

    const carpeta = new Carpeta( data );
    await carpeta.save();
    res.status(201).json(carpeta);

}

const carpetasPut = async (req, res=response) => {
    const { id } = req.params;
    const  nombreCarpeta  = req.body;
    const  usuario  = req.body;
    console.log(nombreCarpeta);
    console.log(usuario);

    const  datos = await Carpeta.find( usuario, nombreCarpeta );

    if ( datos.length !== 0 ){
        return res.status(400).json({
            msg: `La carpeta ya existe - 1`
        });
    }

    if (  datos.hasOwnProperty("nombreCarpeta")){
        return res.status(400).json({
            msg: `La carpeta ya existe - 2`
        });
    }


    const carpeta = await Carpeta.findByIdAndUpdate( id, nombreCarpeta );
    console.log(carpeta)

    res.status(201).json({
        msg: 'put API carpeta - controlador',
        nombreCarpeta
    });
}

const carpetasDelete = async (req, res) => {

    const { id } = req.params;

    // Borrado logico
    const carpeta = await Carpeta.findByIdAndUpdate( id, { estado: false } );
    res.json({
        carpeta
    });
}


module.exports = {
    carpetasGet,
    obtenerCarpeta,
    carpetasPost,
    carpetasPut,
    carpetasDelete
}
