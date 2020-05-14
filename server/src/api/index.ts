import { Router } from 'express';
import product from './routes/product';

export default () => {
  const routes = Router();
  product(routes);

  return routes;
};
