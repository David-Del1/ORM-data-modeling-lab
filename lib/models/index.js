import Actor from './Actor.js';
import Film from './Film.js';
import Review from './Review.js';
import Studio from './Studio.js';


// Film.belongsTo(Studio);

Film.belongsTo(Studio, {
  foreignKey: {
    name: 'studio'
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
