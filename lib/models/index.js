import Actor from './Actor.js';
import Film from './Film.js';
import Studio from './Studio.js';
import Review from './Review.js';
import Reviewer from './Reviewer.js';


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

// Reviewer.hasMany(Review, { 
//   foreignKey: {
//     name: 'fromReviewer'
//   }
// });

Review.hasOne(Reviewer, {
  foreignKey: { name: 'reviews' }
});


