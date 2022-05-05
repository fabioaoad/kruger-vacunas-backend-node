const { Schema, model } = require('mongoose');


const CarpetaSchema = Schema({
    nombreCarpeta: {
        type: String,
        required: [true, 'El nombre de carpeta es obligatorio'],
        sparse: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

//Quito el __v y el estado para que no se muestre en postman en la respuesta
CarpetaSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}



module.exports = model('Carpeta', CarpetaSchema);
