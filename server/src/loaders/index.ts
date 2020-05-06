import { Application } from 'express';
import expressLoader from './express';

export default async ({ expressApp }: { expressApp: Application }) => {
    await expressLoader({ app: expressApp });
    console.log('Express Intialized');
};
