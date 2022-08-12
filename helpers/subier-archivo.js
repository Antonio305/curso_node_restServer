const { resolve } = require('path');
const path = require('path');

const { v4: uuidv4 } = require('uuid');
uuidv4();

// const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']


// // validacion de imagenes 
// // entre otrar achivos
// // con esto queda creado para ser reutilizado en cualquier parte del programa

// vamos a recivir el archivo y las extensiones validas
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

     // haremos con promesas   
     // recive los parametro resolve, reject 
     // resolve si todo sale bien 
     // reject si todo salme mal 

    

     return new Promise((resolve, reject) => {
          // laparte de abajo se paso al subier-archiov para una validaciones delas entradas

          //  estremos el archivo la cual es ti tipo files
          const { archivo } = files;
      
         

          // validacion de las extencioens 
          /// split corta el string,  tomando como referencia el . de onde debe separar (separando el nombre  de la extencio)
          //  [ 'ControlManual2', 'tif' ]   resultado

          const nombreContado = archivo.name.split('.');
          console.log(nombreContado);

          const extension = nombreContado[nombreContado.length - 1];

          // const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

          // si no esel tipo rernamos un error
          if (!extensionesValidas.includes(extension)) {
               // error sera un reject 
               return reject(`msg: La estension ${extension} no es permitida ${extensionesValidas}`);
          };



          // cremos un nombre temporal al archivo 
          // nombre sera el id creatdo, ms la extendion
          const nombreTemporal = uuidv4() + '.' + extension;

          // // _dirname llega asta el controlador
          // // path uno los diferentes path 
          // // opload , es done se guarda las imagens o archivos que nos viene en la ruta 
          // //  uploadPath path de dondeese guarda el archivo

          // const uploadPath = path.join(__dirname, '../opload/', archivo.name);
          const uploadPath = path.join(__dirname, '../opload/', carpeta, nombreTemporal);

          // Use the mv() method to place the file somewhere on your server
          archivo.mv(uploadPath, function (err) {
               if (err) {
                    // los internal server error se debe imprimir en consolsa

                    console.log(err);
                    reject(err);
                    // return res.status(500).json(err);
               }  // status 500 error del servidor 
               // sl usuario solo le sirve al nombre del archivo no  todoel path 
               // resolve(uploadPath);
               resolve(nombreTemporal);
               // res.json({ mgs: 'File uploaded!' + uploadPath });
          });

     });
}







module.exports = {

     subirArchivo

}