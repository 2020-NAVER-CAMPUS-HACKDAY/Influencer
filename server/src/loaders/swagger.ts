import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import docs from '../api/swaggerDocs';

export default ({ app }: { app: Application }) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
};
