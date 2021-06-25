import Sequelize from 'sequelize';
import db from '../utils/db.js';
import Reviewer from './Reviewer.js';

class Actor extends Sequelize.Model {}

Actor.init(
  {
    name:{
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    dob:{
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
      unique: false
    },
    pob:{
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  },
  {
    sequelize: db,
    modelName: 'Actor',
    underscored: true,
  }
);

export default Actor;
