import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Reviewer extends Sequelize.Model {}

Reviewer.init(
  {
    userName:{
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    company: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: 'Reviewer',
    underscored: true,
  }
);

export default Reviewer;
