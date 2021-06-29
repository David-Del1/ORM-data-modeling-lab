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
    },
    state: {
      type: Sequelize.DataTypes.STRING,
    },
    country: {
      type: Sequelize.DataTypes.STRING,
    } 
  },
  {
    sequelize: db,
    modelName: 'Studio',
    underscored: true,
    timestamps: false
  }
);

export default Studio;
