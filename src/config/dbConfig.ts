import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
  'dbConfig.dev',
  (): PostgresConnectionOptions => ({
    // Need to move to .env file for security reasons
    url: process.env.DATABASE_URL,
    type: 'postgres',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    entities: [__dirname + '/../entities/**/*.entity.{ts,js}'],
    synchronize: true, //in prod set to false and use migrations
  }),
);
