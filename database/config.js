

// import package int he mogoose

const mongoose = require('mongoose');


// creating Function in the connection database
const dbConection = async () => {
    try {
        console.log('Base de datos only');
        await  mongoose.connect(process.env.MONGODB_CNN);
    } catch (error) {
        // si hay un error en la conenccion lo tronamos
        console.log(error);  // mostrmos por console el error
        // throw new Error;
    }
}

module.exports = {
    dbConection: dbConection,
}