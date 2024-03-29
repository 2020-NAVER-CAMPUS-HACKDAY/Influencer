import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT as string, 10),
  databaseURI: process.env.DB_URI,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
  personaId: '5ebce39c2d549b3a722b7a0e',
  personaName: '윤자이',
  pagination: 30,
  clicklogWeight: 0.3,
  likeWeight: 3.0
};
