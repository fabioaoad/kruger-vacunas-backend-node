const { Schema, model } = require('mongoose');


const VacunaSchema = Schema({
    fechaVacunacion: {
        type: Date,
        default: null,
        required: [true, 'la fecha de vacunacion es obligatoria']
    },
    dosisNumero: {
        type: Number,
        required: [true, 'el numero de dosis es obligatoria']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    vacunaTipo:{
        type: Schema.Types.ObjectId,
        ref: 'VacunaTipo',
        required: true
    }
});




module.exports = model('Vacuna', VacunaSchema);
