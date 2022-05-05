


const { Schema, model } = require('mongoose');

const VacunaTipoSchema = Schema({
    vacunaNombre:{
        type: String,
        required: [true, 'La vacuna es obligatoria']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('VacunaTipo', VacunaTipoSchema);
