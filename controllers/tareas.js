const { response } = require('express');
const { Tarea, Carpeta} = require('../models')

const tareasGet = async (req, res= response) => {
    const  usuario  = req.body.usuario.toString();
    const  carpeta  = req.body.carpeta.toString();
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true, usuario, carpeta };

    const [ total, tareas ] = await Promise.all([
        Tarea.countDocuments(query),
        Tarea.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        tareas
    });

}

const tareasPost = async (req, res=response) => {

    const  nombreTarea  = req.body.nombreTarea;
    const  nombreCarpeta  = req.body.nombreCarpeta;
    const  usuarioID = req.usuario._id.toString();
    const  carpetaIDAUX = await Carpeta.findOne({nombreCarpeta});
    const  carpetaID = carpetaIDAUX._id.toString();


    // console.log(nombreTarea);
    // console.log(nombreCarpeta);
    // console.log(usuarioID);
    // console.log(carpetaID);
    //


    // genero la data a guardar
    const data = {
        nombreTarea,
        nombreCarpeta,
        usuario: req.usuario._id,
        carpeta: carpetaIDAUX._id
    }
    //
     const tarea = new Tarea( data );
     await tarea.save();
    res.status(201).json(tarea);

}

const tareasPut =  async (req, res=response) => {
    const { id } = req.params;
    const  nombreTarea  = req.body;
    //const  usuario  = req.body;
    console.log(nombreTarea);
    //console.log(usuario);

    const tarea = await Tarea.findByIdAndUpdate( id, nombreTarea );
    console.log(tarea)

    res.status(201).json({
        msg: 'put API tarea - controlador',
        nombreTarea
    });
}

const tareasCompletadaPut = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findByIdAndUpdate( id, { completado: true } );
    res.json({
        tarea
    });
}

const tareasDelete = async (req, res) => {
    const { id } = req.params;

    // Borrado logico
    const tarea = await Tarea.findByIdAndUpdate( id, { estado: false } );
    res.json({
        tarea
    });
}


module.exports = {
    tareasGet,
    tareasPost,
    tareasPut,
    tareasDelete,
    tareasCompletadaPut
}
