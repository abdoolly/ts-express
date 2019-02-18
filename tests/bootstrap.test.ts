import * as app from '../app';
import 'mocha';
import { Server } from 'http';

let server: Server = null;


/**
 * @description starting the server before the test
 */
before((done) => {
    // using the app to initiate everything
    server = app.listen('3001', (err) => {
        if (err)
            throw err;

        done();
    });
});


/**
 * @description closing the server after the test ends
 */
after((done) => {
    server.close(() => done());
});
