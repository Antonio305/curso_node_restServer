


const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Productos = require('../models/productos');



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


const existeUsuarioById = async (id = '') => {
    //verificamos si existe el id 
    //  const existeUsuario = await Usuario.findById({id:id});
    // const existeUsuario = await Usuario.findById({id : id});
    const existeUsuario = await Usuario.findOne({ id: id });


    // const id = 1002;

    // Shoe.findById(id, function (err, shoe) {
    //     if (err) throw error;
    //     console.log(`Item(s) found: ${shoe.name}`);
    // });

    if (!existeUsuario) {
        throw new Error(`El ID ${id}  no existe`);
    }
}



// productos 

const existProductById = async (id = '') => {

    const existProducts = Productos.findById(id);
    if (!existProducts) {
        throw new Error`El ID  ${existProducts} no existe`;
    }

}


const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    // verificar si la coleccion  recivida es igual ala coleccion permitidas 
    const coleccionesIncluidas = colecciones.includes(coleccion);
    if (!coleccionesIncluidas) {
        throw new Error(` la coleeccion ${coleccion} no es permitida, ${colecciones}  `);
    }

    return true;
}


// pasamos somo un objeto
module.exports = {
    esRoleValido,
    // emailExiste
    emailExist,
    existeUsuarioById,
    existProductById,
    coleccionesPermitidas

}