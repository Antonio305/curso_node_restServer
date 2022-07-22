

const { validationResult } = require('express-validator');

/// we create  function to validate the fiels
// cremso una funcion para validars los capos 

const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    // preguntmaos el es nulo a errores
    if (!errors.isEmpty()) {
        return res.status(404).json(errors);
    }

    next();  // s i tood dales ejecuta  el next


}

module.exports  = {
    validarCampos
}