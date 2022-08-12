



const { request, response } = require('express');
//  const validarArchivo = (files)=>{

//      if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
//           return res.status(400).json({ mgs: 'No files were uploaded.' });
//      }
  

//  }



const validarArchivo = (req = request, res = response, next) => {

     if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
          return res.status(400).json({ mgs: 'No files were uploaded..  validararchivo' });
     }

     next();


}

module.exports  = {
     validarArchivo
}