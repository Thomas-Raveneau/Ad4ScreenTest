
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../utils/database.js';

class User extends Model { }

User.init({
  name: DataTypes.STRING,
  descriptionMaxSize: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'user',
});

export default User;