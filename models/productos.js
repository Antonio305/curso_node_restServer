

// desestrucuracion de mongoose 
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({

     name: {
          type: String,
          required: true,
          unique: true
     },

     status:
     {
          type: Boolean,
          default: true,
          required: true,
     },
     usuario: {
          type: Schema.Types.ObjectId,
          ref: 'Usuario',
          required: true,

     },
     precio: {
          type: Number,
          default: 0,
     },
     categoria: {
          type: Schema.Types.ObjectId,
          ref: 'Categoria',
          required: true,
     },
     description: {
          type: String
     },
     disponible: {
          type: Boolean,
          default: true
     }


});



ProductoSchema.methods.toJSON = function () {

     // destructuracion de los datos  categoria.uid  = _id;
     const { __v, status, _id, ...productos } = this.toObject();
     productos.uid = _id;
     return productos;


}

module.exports = model('Producto', ProductoSchema);