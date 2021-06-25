import sequelize from './lib/utils/db.js';

run();

async function run() {
  await sequelize.sync({ alter: true });
}
