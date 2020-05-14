import { Container } from 'typedi';
import Logger from './logger';

export default ({ models }: { models: { name: string; model: any }[] }) => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    Container.set('logger', Logger);
  } catch (e) {
    Logger.error('Error on dependency injector loader: %o', e);
    throw e;
  }
};
