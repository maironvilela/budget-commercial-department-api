import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export const TypeormHelper = {
  connection: null,

  async connect(): Promise<void> {
    const defaultOptions = await getConnectionOptions();

    const connection = await createConnection(
      Object.assign(defaultOptions, {
        host: process.env.DOCKER_SERVICE_POSTGRES || 'localhost',
        database: process.env.NODE_ENV === 'test' ? 'budget-test' : 'budget',
      }),
    );

    this.connection = connection;
  },

  async disconnect(): Promise<void> {
    await this.connection.close();
  },

  async getConnection(): Promise<Connection> {
    if (!this.connection) {
      await this.connect();
    }

    return this.connection;
  },
};
