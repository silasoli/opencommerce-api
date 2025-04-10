import databaseConfig from '../config/database.config';
import { DataSource } from 'typeorm';

export default new DataSource(databaseConfig());
