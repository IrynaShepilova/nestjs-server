import config from './ormconfig';
import { DataSource } from 'typeorm';

export default new DataSource(config);