import { TypeormHelper } from '@/infra/db/typeorm/helpers/typeorm-helpers';

TypeormHelper.getConnection()
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(5050, () =>
      console.log(`Server running at http://localhost: 5050`),
    );
  })
  .catch(err => {
    console.log(err);
  });
