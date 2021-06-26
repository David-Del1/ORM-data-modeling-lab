
import sequelize from './lib/utils/db.js';
import Film from './lib/models/Film.js';
import Studio from './lib/models/Studio.js';

run();

async function run() {
  await sequelize.sync({ alter: true });
  // await User.create({
  //   handle: 'spot',
  //   email: 'spot@email.com'
  // });
}