import { Router } from 'express';
import { getRouteProvider } from './serviceProviders/RoutesProvider';
const router = Router();
const Route = getRouteProvider.provide();

Route.get('/', 'BaseController@test');

export = router;
