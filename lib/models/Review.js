import Sequelize from 'sequelize';
import db from '../utils/db.js';

class Review extends Sequelize.Model { }

Review.init(
  {
    rating: {
      type: Sequelize.DataTypes.INTEGER,
      validate: { min: 1, max: 5 },
      allowNull: false,
    },
    review: {
      type: Sequelize.DataTypes.STRING(140),
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: db,
    modelName: 'Review',
    underscored: true,
    timestamps: false
  }

);

export default Review;
