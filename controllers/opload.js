
// agregmao el path para hacer una redireccion de donde movemos los archivos 
// esot para guardarel cualquier carpeta
// propio de node 
const path = require('path');
const fs = require('fs');
const { request, response } = require('express');
const { subirArchivo } = require('../helpers/subier-archivo');
const { Usuario, Productos } = require('../models');

const cloudinary = require('cloudinary').v2
// configuracion o autentificacion de backend
cloudinary.config(process.env.CLOUDINARY_URL);

// actualizar imagenes
const actualizarArchivos = async (req = request, res = response) => {

     // creaod un middleware por aparte
     // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
     //      return res.status(400).json({ mgs: 'No files were uploaded.' });
     // }


     // destrucutacio de los parametros 
     const { id, coleccion } = req.params;

     // cremso uns swith dependiendo de tipo de coleccion que recivimos 
     // ejecutamos una de las funcieos creadas 

     let modelo;

     switch (coleccion) {
          case 'usuarios':
               // buscamo si hay un id con esa coleccion nque recivimos 
               modelo = await Usuario.findById(id);
               // si eexiste se actualiza si no no se hace nada 
               if (!modelo) {
                    // error internal server 
                    return res.status(400).json(
                         {
                              msg: `no existe el usuario con el  id ${id}`
                         }
                    );
               }



               break;
          case 'productos':
               // buscamo si tenemos el producto con el id recivido 
               modelo = await Productos.findById(id);
               if (!modelo) {
                    return res.status(400).json(
                         {
                              msg: ` El producto con el id ${id} no existe`
                         }
                    );
               }

               break;


          default:
               return res.status(500).json({
                    msg: 'se me olvido validar esto '
               });
     }




     // limpiar imagens previas,  mas bien borrar todas las basuras

     if (modelo.img) {         // preguntamos si la img existe
          // hay que borrar la imgen del serrvidor 
          // estmos en la carpeta contorller tenemos que apuntar al opload
          // para saber que borrar mandamos la coleccion , la cual seria la comeccion
          // le pasamos el nombre la imagen 
          const pathImagen = path.join(__dirname, '../opload', coleccion, modelo.img);

          // preguntamos si existe el archivo 
          // si existe regresa  un true
          if (fs.existsSync(pathImagen)) {
               fs.unlinkSync(pathImagen);
          }

     }

     // try {


     // } catch (error) {

     // }


     // esto lo hace los dos al mismo tiempo

     // cremos una carpeta con el nombre de la coleccion que recivimos 
     const nombre = await subirArchivo(req.files, undefined, coleccion);
     modelo.img = nombre;

     await modelo.save();


     res.json(modelo);
}




// actualizarImagenesCloundary
const actualizarArchivosCloundary = async (req = request, res = response) => {

     // destrucutacio de los parametros 
     const { id, coleccion } = req.params;

     let modelo;

     switch (coleccion) {
          case 'usuarios':
               // buscamo si hay un id con esa coleccion nque recivimos 
               modelo = await Usuario.findById(id);
               // si eexiste se actualiza si no no se hace nada 
               if (!modelo) {
                    // error internal server 
                    return res.status(400).json(
                         {
                              msg: `no existe el usuario con el  id ${id}`
                         }
                    );
               }



               break;
          case 'productos':
               // buscamo si tenemos el producto con el id recivido 
               modelo = await Productos.findById(id);
               if (!modelo) {
                    return res.status(400).json(
                         {
                              msg: ` El producto con el id ${id} no existe`
                         }
                    );
               }

               break;


          default:
               return res.status(500).json({
                    msg: 'se me olvido validar esto '
               });
     }




     // limpiar imagens previas,  mas bien borrar todas las basuras

     if (modelo.img) {         // preguntamos si la img existe
          const nombreArray = modelo.img.split('/');    // lo separmso por el /
          // estrear el ultimo valor del  array que es el id 
          const nombre = nombreArray[nombreArray.length - 1];
          // otra destructuraciomn del arrlo para separar del id ala extenxion 
          const [public_id] = nombre.split('.');

          // el await no es necesario 
          await cloudinary.uploader.destroy(public_id);

     }

     // subir el archivo el clo8ndary
     // vmaos a mandar el archivo temporal 
     //  console.log(req.files.archivo);  
     // destrucuturacion de objeto 

     const { tempFilePath } = req.files.archivo;

     const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
     // solo vmaos a extraer el secure_url la cual es e linkdel archivo 
     modelo.img = secure_url;

     await modelo.save()  // guardamos los cambios

     return res.json(modelo);
}






const cargarArchivos = async (req, res) => {
     // foo nombre archivo recivido
     console.log(req.files); // the uploaded file object



     // preguntai si viene el archivo, cos contrario retorn un status 400
     // contiene 3 validaciones 

     // creado pro un middleare por aparte en las rutas 
     // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
     //      return res.status(400).json({ mgs: 'No files were uploaded.' });
     // }

     // estremos le nombre del archivo ya que solo eso estamos retornando
     // md es de tipo maddown
     try {
          // const extensiones = ['txt', 'md'];
          // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
          const nombre = await subirArchivo(req.files, undefined, 'imgs');

          res.json({ nombre });
     } catch (msg) {

          // error del servidor
          // internal server 

          return res.status(400).json({ msg });
     }
     // // laparte de abajo se paso al subier-archiov para una validaciones delas entradas

     // //  estremos el archivo la cual es ti tipo files
     // const { archivo } = req.files;
     // // validacion de las extencioens 
     // /// split corta el string,  tomando como referencia el . de onde debe separar (separando el nombre  de la extencio)
     // //  [ 'ControlManual2', 'tif' ]   resultado
     // const nombreContado = archivo.name.split('.');
     // console.log(nombreContado);

     // const extension = nombreContado[nombreContado.length - 1];
     // const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
     // // si no esel tipo rernamos un error
     // if (!extensionesValidas.includes(extension)) {
     //      return res.status(400).json({
     //           msg: `La estension ${ extension } no es permitida ${ extensionesValidas }`
     //      });
     // }


     // // cremos un nombre temporal al archivo 
     //  // nombre sera el id creatdo, ms la extendion
     // const nombreTemporal = uuidv4() + '.' + extension;

     // // // _dirname llega asta el controlador
     // // // path uno los diferentes path 
     // // // opload , es done se guarda las imagens o archivos que nos viene en la ruta 
     // // //  uploadPath path de dondeese guarda el archivo

     // // const uploadPath = path.join(__dirname, '../opload/', archivo.name);
     // const uploadPath = path.join(__dirname, '../opload/', nombreTemporal);

     // // Use the mv() method to place the file somewhere on your server
     // archivo.mv(uploadPath, function (err) {
     //      if (err) {
     //           // los internal server error se debe imprimir en consolsa

     //           console.log(err);
     //           return res.status(500).json(err);
     //      }  // status 500 error del servidor 
     //      res.json({ mgs: 'File uploaded!' + uploadPath });
     // });

}


// controlador para mostar una imagen 

const mostrarImagen = async (req = request, res = response) => {

     // destrucutacio de los parametros 
     const { id, coleccion } = req.params;

     // ejecutamos una de las funcieos creadas 

     let modelo;
     const placeholderImage = path.join(__dirname, '../assets/placeholder.jpg');

     switch (coleccion) {
          case 'usuarios':
               // buscamo si hay un id con esa coleccion nque recivimos 
               modelo = await Usuario.findById(id);
               // si eexiste se actualiza si no no se hace nada 
               if (!modelo) {
                    // error internal server 
                    // podmeos mostrar otra cosa si no viene la imagen 
                    return res.status(400).json({
                         msg: `no existe el usuario con el  id ${id}`
                    });
               }
               break;

          case 'productos':
               // buscamo si tenemos el producto con el id recivido 
               modelo = await Productos.findById(id);
               if (!modelo) {

                    return res.status(400).json({
                         msg: ` El producto con el id ${id} no existe`
                    });
               }

               break;

          default:
               return res.status(500).json({
                    msg: 'se me olvido validar esto '
               });
     }




     if (modelo.img) {         // preguntamos si la img existe

          // const pathImagen = path.join(__dirname, '../opload', coleccion, modelo.img);

          // preguntamos si existe el archivo 
          // si existe regresa  un true
          // if (fs.existsSync(pathImagen)) {

          // mostramos la imagen si existe en la base de datos 
          // return res.sendFile(pathImagen);

          return res.sendFile(modelo.img);

     }

}

// caso contrario si no  hay imagne hay que mandar un relleno la cula 
// seria un placeholder 

return res.sendFile(placeholderImage);
     // return res.sendFile(modelo.img);
}


module.exports = {

     cargarArchivos,
     actualizarArchivos,
     mostrarImagen,
     actualizarArchivosCloundary
}