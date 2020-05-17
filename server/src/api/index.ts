import { Router } from 'express';
import product from './routes/product';
import user from './routes/user';
import category from './routes/category';

export default () => {
  const routes = Router();
  product(routes);
  user(routes);
  category(routes);

  return routes;
};
