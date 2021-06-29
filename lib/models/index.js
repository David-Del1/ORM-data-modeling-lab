import Actor from './Actor.js';
import Film from './Film.js';
import Review from './Review.js';
import Reviewer from './Reviewer.js';
import Studio from './Studio.js';

Film.belongsTo(Studio, {
  foreignKey: {
    name: 'studio'
  }
});

Reviewer.hasMany(Film, {
  foreignKey: {
    name: 'reviewer'
  }
});

Actor.belongsToMany(Film, {
  through: 'ActorFilm'
});

Review.belongsTo(Film, {
  foreignKey: {
    name: 'film'
  }
});

Reviewer.hasMany(Review, {
  foreignKey: {
    name: 'reviewer'
  }
});
