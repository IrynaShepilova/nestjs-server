import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'dbuser',
    password: '1234db',
    database: 'database',
    entities: [
        __dirname + '/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
    migrations: [ __dirname + '/**/migrations/**/*.{.ts,.js}'],
};

export default config;