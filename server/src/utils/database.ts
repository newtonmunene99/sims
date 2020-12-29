import { createPool, Pool } from 'mysql';
import Importer from 'mysql-import';

class Database {
  private pool: Pool;
  private importer: Importer;

  constructor(
    host: string,
    user: string,
    password: string = '',
    database: string,
  ) {
    this.pool = createPool({
      host,
      user,
      password,
      database,
    });

    this.importer = new Importer({
      host,
      user,
      password,
      database,
    });
  }

  seedDatabase() {
    return this.importer.import('sims.sql');
  }

  query(args: { sql: string; [key: string]: any }) {
    return new Promise<any>((resolve, reject) => {
      this.pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          connection.query(args, (error, results) => {
            if (error) {
              connection.release();
              reject(error);
            } else {
              connection.release();
              resolve(results);
            }
          });
        }
      });
    });
  }
}

export const database = new Database(
  process.env.DB_HOST! ?? 'localhost',
  process.env.DB_USER! ?? 'root',
  process.env.DB_PASSWORD! ?? '',
  process.env.DB_NAME! ?? 'sims',
);
