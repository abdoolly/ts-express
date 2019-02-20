import { getRouteProvider } from './serviceProviders/RoutesProvider';
let Route = getRouteProvider.provide();

Route.get('/test', 'BaseController@test');

export = Route;
