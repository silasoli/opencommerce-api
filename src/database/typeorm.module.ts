import { Global, Module, Logger } from '@nestjs/common';
import typeormConfig from './ormconfig';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        const logger = new Logger('TypeOrmConfigModule');
        try {
          const dataSource = typeormConfig;
          await dataSource.initialize();
          logger.verbose('Database connected successfully');
          return dataSource;
        } catch (error) {
          logger.error('Error connecting to database', error.stack);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmConfigModule {}
