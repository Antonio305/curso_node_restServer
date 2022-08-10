const { Categoria } = require("../models");

const existeCaetgoria = async (id = '') => {


     // const categoria = await Categoria.findOne({ id: id });
     const categoria = await Categoria.findById(id);

     if (!categoria) {
          throw new Error(` la categoria con el  id : ${id} no existe `);
     }

}

module.exports = {
     existeCaetgoria
}