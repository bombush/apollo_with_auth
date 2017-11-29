//import authPre from './authPre';
//import authPost from './authPost';

const define = (Sequelize, sequelize) => {

  const Procedure = sequelize.define(
    'procedure',
    {
      'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      'patient_id': {
        type: Sequelize.INTEGER,
      },
      'treatment_id': {
        type: Sequelize.INTEGER,
      },
      'user_id': {
        type: Sequelize.INTEGER,
      },
      'date': {
        type: Sequelize.DATE
      }
    },
    {
      tableName: 'procedure',
      timestamps: false
    }
  );

  return Procedure;
}

export default define;
