const Ajv = require("ajv");
// const pino = require('pino')
import * as pino from 'pino';

export let validationHook = (req, res, next) => {
    req.validate = (schema, payload) => {
        const ajv = new Ajv({ allErrors: true });
        const isValid = ajv.validate(schema, payload);

        if (!isValid) {
            //response based on
        }
    }

    next();
}

/**
 * 
 * level name	level number
        off	    0
        fatal	100
        error	200
        warn	300
        info	400
        debug	500
        trace	600
        all	Number.MAX_VALUE
 */