import * as root from 'app-root-path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as routes from './src/routes';
import { BaseBootstrapper } from './src/bootstrapers/BaseBootstrapper';

// initiating the express
const app = express();

// view engine setup
app.set('views', `${root}/src/views/`);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

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
