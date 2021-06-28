import Actor from './Actor.js';
import Film from './Film.js';
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

// Film.belongsToMany(Actor, {
//   through: 'ActorFilm'
// });
