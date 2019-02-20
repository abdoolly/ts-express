import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

// initiating the express
export const app = express();

import * as routes from './src/routes';

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

// export = app;
