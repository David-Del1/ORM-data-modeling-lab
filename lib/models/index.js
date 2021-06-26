import Film from './Film.js';
import Studio from './Studio.js';


// Film.belongsTo(Studio);

Film.belongsTo(Studio, {
  foreignKey: {
    name: 'studio'  
  }
});
