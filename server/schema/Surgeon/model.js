import authPre from './authPre';
import authPost from './authPost';

const define = (Sequelize, sequelize) => {

  const Users = sequelize.define(
    'user',
    {
      'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: Sequelize.STRING,
      name: Sequelize.STRING
    },
    {
      tableName: 'user',
      timestamps: false
    }
  );

  return Users;
}

export default define;
