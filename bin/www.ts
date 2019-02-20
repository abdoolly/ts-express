/**
 * Module dependencies.
 */
import * as debug from 'debug';
import * as http from 'http';
import * as app from '../app';
import { BaseException } from '../src/exceptions/BaseException';

// binding to console
const log = debug('modern-express:server');
log.log = console.log.bind(console);

/**
 * Get port from environment and store in Express.
 */
const PORT = process.env.PORT || '3000';

app.set('port', PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(PORT);

server.on('error', (error: any) => {
  /**
   * Event listener for HTTP server "error" event.
   */
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  /**
   * Event listener for HTTP server "listening" event.
   */
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
});

/**
 * global promise rejection error handler
 */
process.on('unhandledRejection', async function (errInstance: BaseException, p) {
  console.log('errInstance', errInstance);
});
