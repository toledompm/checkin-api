import { Environment } from 'src/common/environtment';

const { host, port, username, password, database } = Environment.config.db;

module.exports = {
  host,
  port,
  username,
  password,
  database,
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: true,
};
