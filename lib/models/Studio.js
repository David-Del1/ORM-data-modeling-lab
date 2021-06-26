import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Studio extends Sequelize.Model {}

Studio.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    city: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    state: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    country: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: false
    } 
  },
  {
    sequelize: db,
    modelName: 'Studio',
  }
);

export default Studio;
