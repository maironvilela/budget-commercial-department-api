import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return await createConnection(
    Object.assign(defaultOptions, {
      host: process.env.DOCKER_SERVICE_POSTGRES,
      database:
        process.env.NODE_ENV === 'test' ? 'budget' : defaultOptions.database,
    }),
  );
};
