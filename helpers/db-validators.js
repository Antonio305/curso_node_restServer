


const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    // si el rol existe no devolvera 
    const existRol = await Role.findOne({ rol: rol });
    // si no existem mandamos un error,  mostramo un error personalizado
    if (!existRol) {
        throw new Error(`El rol ${rol}, no estaaregistrado en la base de datos`);
    }
}
// funstin valition 



// function to validate mail
const emailExist = async (correo = '') => {
    const existEmail = await Usuario.findOne({ correo: correo });
    if (existEmail) {
        // mostramos el error peor no un  res
        throw new Error(` El correo ${correo} ya ha sido registrado`);

        // return   res.status(400).json({
        //  msg: "El correo ha sido registrado"
        // });
    }
}


const existeUsuarioById = async (id) => {
         //verificamos si existe el id 
         const existeUsuario = await Usuario.findById(id);

         if(!existeUsuario){
                 throw new Error(`El ID  ${existeUsuario} no existe`); 
         }
}


// pasamos somo un objeto
module.exports = {
    esRoleValido,
    // emailExiste
    emailExist,
 existeUsuarioById 

}