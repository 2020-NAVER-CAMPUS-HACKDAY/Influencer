import { Router } from 'express';
import product from './routes/product';
import user from './routes/user';

export default () => {
  const routes = Router();
  product(routes);
  user(routes);

  return routes;
};
