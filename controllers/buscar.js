const { request, response } = require('express');
// importaciobn de metodo para evaluar si es de tipo monod el id 

const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Productos } = require('../models/index');

//creamo una coleccion de dato haciendo referancia de las coledcio    que tenemos creadas
//  is hay mas coledcciones se agragan en esta arreglo
const coleccionesPermitidas = [
     'usuarios',
     'categoria',
     'producto',
     'roles'

];


// metodo para buscar ususarios
// vamos a recivir el termino y el res para mandar la respueata
// busqueda por el di y por el nombre
const buscarUsuario = async (termino = '', res = response) => {

     // evalucion si el id es de tipo mongo
     const idMongoId = ObjectId.isValid(termino);  // true

     if (idMongoId) {
          // hacer la peticio por id 
          const usuario = await Usuario.findById(termino);
          // con esto creamos una lsita de objetos
          // return par aque esto ya no ejecute despues de mostrar el reaultado
          return res.json({
               results: (usuario) ? [usuario] : []  // si el resultado es null vamos a retornar un array vacio
          });
     }


     /*
        buscar por nombre, 
         en la cual debe soportar mayudculas y minusculas para eso existe la expreccion regular 
         en la cual expression regular ya esta defino por defecto en js 
  
          'i' => significa  no datos a los datos 
     */

     const regex = new RegExp(termino, 'i');
     // ya como parametro de busqueda parasamo la expreccion regul 

     // puede ser correo o el nombre del producto 
     const usuarios = await Usuario.find({

          // dentor de aca podemos hacer las validaciones 
          // $or le dice es esta o esta
          $or: [{ name: regex, status: true }, { correo: regex }],
          // que sea de 
          $and: [{ status: true }]


     });

     res.json({
          results: (usuarios) ? [usuarios] : []
     });


}

//  funcion para buscar una categoria 
// recivimos el parametro  le termino y el res para mandar las respuestas 
// buscar por nombre y id
const buscarCaregoria = async (termino = '', res = response) => {

     // pretuntamos si el di es de tipo mongo 
     const esMongoId = ObjectId.isValid(termino);
     if (esMongoId) {
          const categoria = await Categoria.findById(termino);
          // vamoas a devolver una lsita de objetos
          return res.json({
               results: (categoria) ? (categoria) : []
          });
     }


     // caso contrario conel nombre para la busqueda 
     // evaluacion de la expreccion regular 
     const regex = new RegExp(termino, 'i');

     // puede ser la busqueda por nombre y por el precio 
     const categorias = await Categoria.find({ name: regex, status: true });
     res.json({
          results: (categorias) ? (categorias) : []
     });

}


// funcrion parabuscar el producto
const bucarProducto = async (termino = '', res) => {

     //  verifica si el id de de tipo mongo
     const esMongoId = ObjectId.isValid(termino);
     if (esMongoId) {
          const producto = await Productos.findById(termino)
               .populate('categoria', 'name')
               .populate('usuario', 'name');

          return res.json({
               results: (producto) ? (producto) : []
          });
     }

     // expression regular 
     const regex = new RegExp(termino, 'i');
     // caso contrario si recivmosel nommbre ey el precio del producto

     const productos = await Productos.find({ name: regex })
          .populate('categoria', 'name')
          .populate('usuario', 'name');


     res.json({
          results: (productos) ? (productos) : []
     });


}





const buscar = (req = request, res = response) => {

     // extermosl coleccion y el termino de busqueda 
     const { coleccion, termino } = req.params;

     //Condicion para verificar si es la misma coleccion que nos manda como parametro 

     if (!coleccionesPermitidas.includes(coleccion)) {  // true, false
          // regresamos un backrequet si no hay una coleccion del que se noms mando
          return res.status(400).json({
               msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
          });
     }

     // cremso un switch de las opciones 
     switch (coleccion) {
          case 'usuarios':
               buscarUsuario(termino, res);  // metodo para buscar, y le pasamos el termino el res
               break;
          case 'categoria':
               buscarCaregoria(termino, res);
               break;
          case 'producto':
               bucarProducto(termino, res);
               break;
          default:
               // code 500 error en el servidor 
               res.status(500).json({
                    msg: 'se le olvido hacer esta busqueda'
               });
               break;
     }

}



module.exports = {
     buscar
}