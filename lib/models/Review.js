import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Review extends Sequelize.Model { }

Review.init(
  {
    rating: {
      type: Sequelize.DataTypes.INTEGER(),
      // validate: { min: 1, max: 5 },
      // allowNull: false,
      // unique: false
    },
    reviewer: {
      type: Sequelize.DataTypes.BIGINT,
      // allowNull: false,
      // unique: true
    },
    review: {
      type: Sequelize.DataTypes.STRING(),
      // validate: { max: 140 },
      // allowNull: false,
      // unique: false
    }
  },
  {
    sequelize: db,
    modelName: 'Review',
    underscored: true,
  }

);

export default Review;
