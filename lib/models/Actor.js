import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Actor extends Sequelize.Model { }

Actor.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    pob: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: 'Actor',
    underscored: true,
    timestamps: false
  }
);

export default Actor;
