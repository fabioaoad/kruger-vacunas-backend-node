const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    dni: {
        type: Number,
        required: [true, 'El dni es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'la direccion es obligatorio']
    },
    fechaNac: {
        type: Date,
        required: [true, 'la fecha de nacimiento es obligatoria']
    },
    celular: {
        type: Number,
        required: [true, 'El celular es obligatorio']
    },
    estado_vacunacion:{
        type: Boolean,
        default: false
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','EMPLEADO_ROLE', 'VENTAS_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

//Quito el __v y el password para que no se muestre en postman en la respuesta
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
