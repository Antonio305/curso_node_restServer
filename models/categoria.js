


// destructuracion de mogoose 
const { Schema, model } = require('mongoose');


// creating collection 
const CategoriaChema = Schema({

     // creating variables o properties 
     name: {
          type: String,
          required: [true, 'el nombre el obligatorio'],
          unique: true
     },
     status: {
     type: Boolean, // valor por defecto
          default: true,
          required: [true, 'se require el estado'],
     },
     // quien creo el usuario
     usuario: {
          type: Schema.Types.ObjectId,  // objeto id 
          ref: 'Usuario',  // referencia ala tabla usuari oel sigurlar
          required: true,  // todos deben tener categorias 
     }



});


   // metodo para devolver datos personamlizados
   //  para no msotrar todoos los datos 

   CategoriaChema.methods.toJSON = function (){

   // destructuracion de los datos  categoria.uid  =_id;
   const {__v, status, _id, ...categoria} = this.toObject();
                    categoria.uid  =_id;
       return categoria; 

   }






// nombre de la tabla debe ser singular,
// en la base de datos ya lo crar plural 

module.exports = model('Categoria', CategoriaChema);




