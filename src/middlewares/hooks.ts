const Ajv = require('ajv');
import * as pino from 'pino';

export let validationHook = (req, res, next) => {
    req.validate = (schema, payload) => {
        const ajv = new Ajv({ allErrors: true });
        const isValid = ajv.validate(schema, payload);

        if (!isValid) {
            // response based on
        }
    };

    next();
};
