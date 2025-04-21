import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export default registerAs('database', () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DATABASE } = process.env;

  return {
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    autoLoadEntities: false,
    // entities: ['dist/database/entities/**/*.entity{.js,.ts}'],
    entities: [__dirname + '/../**/database/entities/*.entity{.ts,.js}'],
    migrations: ['dist/database/migrations/**/*{.js,.ts}'],
    synchronize: false,
    migrationsRun: false,
    schema: 'public',
    cli: {
      migrationsDir: 'src/database/migrations',
    },
    // ssl: {
    // rejectUnauthorized: false,
    // },
  } as DataSourceOptions;
});
