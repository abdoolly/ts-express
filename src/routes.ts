import { getRouteProvider } from './serviceProviders/RoutesProvider';
let Route = getRouteProvider.provide();

Route.get('/', 'BaseController@test');

export = Route;
