import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Streamer } from './entity/streamers.model';

const database = process.env.NODE_ENV === 'test' ? ':memory:' : './data.db';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: database,
  synchronize: true,
  entities: [Streamer],
  subscribers: [],
  migrations: [],
});

const getDataSource = (delay = 3000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject('Failed to create connection with database');
    }, delay);
  });
};

export { AppDataSource, getDataSource };
