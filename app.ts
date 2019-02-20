import * as root from 'app-root-path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as routes from './server/routes';
import { validationHook } from './server/middlewares/hooks'
import * as pino from 'pino';


// initiating the express
const app = express();

// view engine setup
app.set('views', `${root}/server/views/`);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(validationHook);


/**
 * off	100 ("silent")
    fatal	60
    error	50
    warn	40
    info	30
    debug	20
trace	10
 */
function thisLine() {
    const e = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/
    const match = regex.exec(e.stack.split("\n")[2]);
    return {
      filepath: match[1],
      line: match[2],
      column: match[3]
    };
  }
  
console.log(thisLine());

global['print'] = pino({
    customLevels: {
        off: 600
    },
    useOnlyCustomLevels: false,
    level: 'trace',
    prettyPrint: true,
    base:{line:new Error().lineNumber},
});


app.use(cookieParser());

app.use('/', routes);

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('err', err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


export = app;