
const jwt = require('jsonwebtoken');
// require('dotenv').config();

//  funcion para generar JWT
// sera un callback
// un callbak no se usa asyn await 

const generarJWT = (uid = '') => {
     return new Promise((resolve, reject) => {
          // uid es el unico que se alacema en el paylod para el web token


          const payload = {uid};

          jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
               //otros datos de expiracin
               //  expiracion en  cuatro horas
               expiresIn: '10h',
               // algorithm: 'RS256'
          },
               // callback 
               function (error, token) {
                    console.log(error);

                    if (error) {
                         // reject para el error
                         reject('no se puedo generar el token ');
                    } else {
                         resolve(token);
                    }

               }

          );
     })

}


module.exports = {
     generarJWT: generarJWT
};