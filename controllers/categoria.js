
// destructuracion  
const { request, response } = require('express');
// encriptacion de los datos 
const bcrytp = require('bcryptjs');
const { Categoria, Usuario } = require('../models');


// obtener catgorias 
// paginado 
// total
//  object - populate  , para mostrar los  datos con la relacion

const categoriaGet = async (req = request, res = response) => {
     // poblacin = populate 

     // limites de las total del paginado 
     const { limite = 5, desde = 0 } = req.query;
 
     const query = { status: true };


     // destructuracion de la lista de promessa  de arreglos 
     const [total, categorias] = await Promise.all([
          Categoria.countDocuments(query)
          , Categoria.find(query)
               .populate('usuario', 'name') // el segurndo argumento indica que solo nos itnesa el nombre
               .skip(Number(desde))
               .limit(Number(limite))
     ]);

     res.json({
          total,
          categorias
     });

}
// crear cateogoria - privada, cualquier person con un token valido, tiene que es logeado,







// botener categoria por id 
//  object - populate  , para mostrar los  datos con la relacion

const categoriaGetId = async (req = request, res = response) => {
     // obtenemos el id con la desctructuracion del objeto
     const { id } = req.params;

     // const categoria = await Categoria.findOne({id});
     let datos;

     // implementtacio nde profesot 
     const categoria = await Categoria.findById(id).populate('usuario', 'name');

     res.json(
          { categoria: categoria }
     );


     // mi implemetnacio en la validacion de datos 


     // Categoria.findOne({ id: id })
     //      .populate('usuario')
     //      .exec((err, datos) => {
     //           if (err) { console.log(); }
     //           console.log('datosss', datos);
     //           // return datos;

     //           if (!datos) {
     //                return res.status(401).json(
     //                     {
     //                          msg: 'Sin datos de la categoria'
     //                     }
     //                );
     //           }

     //           res.json(
     //                datos,
     //                // datos
     //           );

     //      }
     //      );




}

//   function getCategoriaUser (id = '') {
//   return   Categoria.findOne({ id: id })
//     .populate("usuario")
//     .exec((err, usuario) => {
//       console.log(usuario);
//     });
// }


// update categoria

const categoriaPut = async (req = request, res = response) => {

     // estremos los datos que mandamos en el body 
     // const body = req.body;
     // console.log('datos recividos ', body);
     const { id } = req.params;
     // status 
     // usuario = se asgina quien lo cambio, el dato  datos dle usuario viene en el req
     const { status, usuario, ...data } = req.body;

     data.name = data.name.toUpperCase();
     data.usuario = req.usuarios._id;

     // {new : treu },  para mandar el  documento actualizado
     const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true });

     res.json(categoria);


     // res.json({
     //      actualizado: categoria
     // });



}

const categoriaDelete = async (req = request, res = response) => {

     // destructuramos eel objeto apra  obtener  el id 
     const { id } = req.params;
     const usuario = req.usuarios;
     const categoria = await Categoria.findByIdAndUpdate(id, { status: false }, { new: true});

     res.status(200).json({
          msg: 'Categoria borrado',
          eliminado_por: usuario
     });


}


// borrar categoria 



const cagetoriaPost = async (req = request, res = response) => {

     // estremos el  nombre
     const name = req.body.name.toUpperCase();
     // cosulta  de cateeoria
     const categoriaDB = await Categoria.findOne({ name });

     // existe tirar error
     if (categoriaDB) {
          return res.status(400).json({
               // mgs: `Categoria ${name} !  ya existe`
               mgs: `Categoria ${categoriaDB.name} !  ya existe`

          });
     }


     // generar la data a guardaer
     // evitar quen os manden es status 
     // id del usuario suaremos del que esta creado
     // para no definor el id
     const data = {
          name,
          // se define como se guarda en  mongo
          usuario: req.usuarios._id
     }


     //   console.log(data);
     // guardamos la categoria
     // evitar quen os manden es status 
     const categoria = new Categoria(data);
     console.log(categoria);
     await categoria.save();



     // mandar respuesta
     // 201 creacion
     res.status(201).json({
          mgs: categoria,
     });


}




module.exports = {
     categoriaGet,
     categoriaGetId,
     cagetoriaPost,
     categoriaDelete,
     categoriaPut,


};