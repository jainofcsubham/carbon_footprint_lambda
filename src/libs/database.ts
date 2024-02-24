import { entities } from "src/entities";
import {
  DataSource,
  DataSourceOptions,
} from "typeorm";

/**
 * Database manager class
 */
export class Database {

  constructor() {
  }

  public async getConnection(): Promise<DataSource> {
    const connectionOptions: DataSourceOptions = {
      name: `default`,
      type: `postgres`,
      port: 5432,
      logging: true,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      entities: [...entities],
    };
    let connection : DataSource =  new DataSource(connectionOptions);
    try{
      await connection.initialize()

    }catch(e){
      console.log(e);
    }
    return connection;
  }

  public async destroyConnection(connection : DataSource) {
    await connection.destroy();
  }
}
