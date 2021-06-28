import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Review extends Sequelize.Model {}

Review.init(
  {
    rating: {
      type: Sequelize.DataTypes.INTEGER(),
      allowNull: false,
      validate: {
        is: /[1-5]/
      }
    },
    reviewer: {
      type: Sequelize.DataTypes.BIGINT,
      allowNull: false
    },
    review: {
      type: Sequelize.DataTypes.STRING(140),
      allowNull: false
    },
  },
  {
    sequelize: db,
    modelName: 'Review',
    underscored: true,
  }
);

export default Review;
