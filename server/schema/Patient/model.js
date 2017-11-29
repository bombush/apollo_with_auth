//import authPre from './authPre';
//import authPost from './authPost';

const define = (Sequelize, sequelize) => {

  const Patient = sequelize.define(
    'patient',
    {
      'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'name': {
        type: Sequelize.STRING,
      }
    },
    {
      tableName: 'patient',
      timestamps: false
    }
  );

  return Patient;
}

export default define;
