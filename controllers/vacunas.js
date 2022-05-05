const { response } = require('express');
const { Vacuna, VacunaTipo, Usuario} = require('../models')



const vacunaGet = async (req, res= response) => {
    const  usuario  = "";
    const  vacunaTipo = "";
    const { limite = 30, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, vacunas ] = await Promise.all([
        Vacuna.countDocuments(query),
        Vacuna.find(query)
            .populate('usuario', ['nombre','apellido','dni','direccion','fechaNac','celular','estado_vacunacion','rol','correo'])
            .populate('vacunaTipo', 'vacunaNombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        vacunas
    });

}




const vacunaPost = async (req, res=response) => {

    const  vacunaNombre  = req.body.vacunaNombre;
    console.log(vacunaNombre)
    const  fechaVacunacion   =  req.body.fechaVacunacion;
    const  dosisNumero      =  req.body.dosisNumero;
    const  vacunaTipoIDAUX = await VacunaTipo.findOne({vacunaNombre});
    console.log(vacunaTipoIDAUX)





    // genero la data a guardar
    const data = {
        dosisNumero: dosisNumero,
        fechaVacunacion: fechaVacunacion,
        usuario: req.usuario._id,
        vacunaTipo: vacunaTipoIDAUX._id
    }

    //primero actualizo en usuario el estado de vacunacion a true
    await  estadoVacunacionPut(req.usuario._id.toString());


    //
     const vacunacion = new Vacuna( data );
     await vacunacion.save();
    res.status(201).json(vacunacion);

}



const estadoVacunacionPut = async (id) => {
    const estado_vacunacion = await Usuario.findByIdAndUpdate( id, { estado_vacunacion: true } );

}


const vacunaDelete =  async (req, res) => {
    const { id } = req.params;
    // Borrado fisico
    const vacuna = await Vacuna.findByIdAndDelete( id );
    res.json({
            vacuna
         });

}





module.exports = {
    vacunaPost,
    vacunaGet,
    estadoVacunacionPut,
    vacunaDelete
}
