


// estructuracion de express 
const { response, request } = require('express');
const { Productos, Categoria } = require('../models');


//  funcio para crear 


const productosGet = async (req, res) => {

     // limite cantidad de datos que se puede mostrar
     // desde. al numero de registros queremos inicial
     // se mostrara solo con status true

     const { limite = 5, desde = 0 } = req.query;
     const query = { status: true };

     // const productos = await Productos.find();

     const [total, productos] =await  Promise.all(
          [
               Productos.countDocuments(query),
               Productos.find({ status: true })
                    .populate('usuario')
                    .populate('categoria')
                    .skip(desde).limit(limite)
          ]);

     if (!productos) {
          return res.status(400).json({
               msg: 'Productos no econtrados'
          });
     }

     res.json({
          total,
          productos
     });
}




const getProductsById = async (req = request, res = response) => {
     // id es que se manda en el  path
     const { id } = req.params;


     const products = await Productos.findById(id)
          .populate('usuario')
          .populate('categoria');


     if (!products) {
          return res.status(400).json({
               mgs: `EL ${products} no existe`

          });
     }

     res.json(
          {
               products
          }
     );

}

// editar los datos 
const putProductos = async (req = request, res = response) => {

     const { id } = req.params;

     const { usuario, ...resto } = req.body;


     resto.name = resto.name;
     
     resto.usuario = req.usuarios._id;


     const productos = await Productos.findByIdAndUpdate(id, resto, { new: true });
     console.log('datos actualizados', productos);


     if (!productos) {
          return res.json({
               mgs: ' Sidn dato del producto'
          });
     }


     res.json(
          { productoActualizaso: productos }
     );





}

const deleteProducts = async (req = request, res = response) => {
     // estrmeos el id del parametro    
     const { id } = req.params;

     const productos = await Productos.findByIdAndUpdate(id, { status: false });

     if (!productos) {
          res.status(401).json({
               msg: 'producto no existe'
          });
     }

     res.json({

          productoEliminado: productos

     });



}


const createProducts = async (req = request, res = response) => {

     // creacion de los datos 
     // datos que vamos a recibir desde el body
     const { name, categoria } = req.body;

     if (!name) {
          return console.log(' NO SE ENVIO NADA');
     }
     // preguntamos si existe los datos 
     const productoDB = await Productos.findOne({ name });
     const idCategoria = await Categoria.findOne({ name: categoria });

     // const [productoDB, idCategoria] = Promise.all([
     //      Productos.findOne({ name }),
     //      Categoria.findOne({ name: categoria }),

     //   ]);

     if (!idCategoria) {
          console.log('categoria no existe', idCategoria);
     }

     // conssulta de una categoria 
     //   console.log('caegorias', idCategoria);

     if (productoDB) {
          return res.status(400).json({
               mgs: `Products ${productoDB.name} ha sido registrado`
          });
     }
     // generar data 
     const data = {
          name,
          usuario: req.usuarios._id,
          precio: 234,
          description: 'hecosoososo',
          categoria: idCategoria._id,

     }

     const products = new Productos(data);

     console.log('datos registrados ', products);
     await products.save();


     res.status(201).json(
          { products }
     );

}


module.exports = {
     createProducts: createProducts,
     productosGet,
     getProductsById,
     putProductos,
     deleteProducts
}