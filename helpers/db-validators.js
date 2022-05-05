const Role = require("../models/role");
const {Carpeta, Usuario, Tarea, Vacuna} = require("../models");


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}


const emailExiste = async ( correo = '') => {
    //Verificar si correo existe
    const existeEmail = await Usuario.findOne({ correo } );
    if( existeEmail ){
        throw new Error(`El correo: ${ correo }, ya está registrado`)
    }
}


const existeUsuarioPorId = async ( id ) => {
    //Verificar si id de mongo existe
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El id no existe: ${ id } `)
    }
}

const existeVacunasPorId = async ( id ) => {
    //Verificar si id de mongo existe
    const existeVacuna = await Vacuna.findById( id );
    if( !existeVacuna ){
        throw new Error(`El id no existe: ${ id } `)
    }
}


const existeCarpetaPorId = async ( id ) => {
    //Verificar si id de mongo existe
    const existeCarpeta = await Carpeta.findById( id );
    if( !existeCarpeta ){
        throw new Error(`El id no existe: ${ id } `)
    }
}

const existeTareaPorId = async ( id ) => {
    //Verificar si id de mongo existe
    const existeTarea = await Tarea.findById( id );
    if( !existeTarea ){
        throw new Error(`El id no existe: ${ id } `)
    }
}




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCarpetaPorId,
    existeTareaPorId,
    existeVacunasPorId
}
