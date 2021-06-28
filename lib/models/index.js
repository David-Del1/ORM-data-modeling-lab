import Actor from './Actor.js';
import Film from './Film.js';
import Studio from './Studio.js';
import Review from './Review.js';


Film.belongsTo(Studio, {
  foreignKey: {
    name: 'studio'  
  }
});

Actor.belongsToMany(Film, { through: 'ActorFilms' });
Film.belongsToMany(Actor, { through: 'ActorFilms' });

Studio.hasMany(Film, { foreignKey: 'fromStudio' });

Review.belongsTo(Film, {
  foreignKey: {
    name: 'film'
  }
});
