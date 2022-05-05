const { response } = require('express');
const VacunaTipo = require('../models/vacunaTipo');


const vacunasTipoGet = async (req, res= response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, vacunasTipo ] = await Promise.all([
        VacunaTipo.countDocuments(query),
        VacunaTipo.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        vacunasTipo
    });

}





module.exports = {
    vacunasTipoGet
}
