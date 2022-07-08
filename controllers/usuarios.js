

//hacemos una destructuracio  de express para ebtener el metodo esponse
const { response, request } = require('express');




// solo vmaosa crear funcieos y esportarlas
const usuariosGet = (req, res = response) => {
    // recivimos un json  o de otro tipo de datos
    //   const body = req.body; 
    // como recivirl oa query paramers , express de eso se hace cargo
    // const query = req.query; // sin desctructuracion
    // con destructuracion
    const { q, nombre = "No name", apiKey, page = 1, limit } = req.query;

    res.json({
        smg: 'get  api -controledor',
        ok: 'yes',
        // query
        q,
        // nombre,
        apiKey,
        page,
        limit
    });

}

// fuction put
const usuariosPut = (req, res = response) => {
    // la igual podemos hacer la desctructuracion

    // const id = req.params.id;
    const { id } = req.params.id;
    res.json(
        {
            msg: 'put desde -controlador',
            ok: 'yesss',
            id
        }
    );
}

// function post
const usuariosPost = (req, res = response) => {
    const body = req.body;  // recvimos  todoel body

    const { nombre, edad } = req.body;    // destructuracino 

    res.json({
        msg: 'post -controlados',
        ok: 'siiiii',
        // body,
        nombre,
        edad
    });
}



// fuction delete
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete desde controlador',
        ok: 'yess'
    });
}

// hacemosl ase exportaciones 
module.exports = {
    usuariosGet: usuariosGet,
    usuariosPost: usuariosPost,
    usuariosPut: usuariosPut,
    usuariosDelete: usuariosDelete,
}
