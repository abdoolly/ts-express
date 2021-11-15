import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { validationHook } from './src/middlewares/hooks';
import * as routes from './src/routes';
import * as pino from 'pino';

// first test commit

// initiating the express
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(validationHook);

global['print'] = pino({
  customLevels: {
    off: 600
  },
  useOnlyCustomLevels: false,
  level: 'trace',
  prettyPrint: true,
  base: null,
});

app.use(cookieParser());

app.use('/', routes);

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      console.log('err', err);

      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    }
  );
}

export = app;
