const define = (Sequelize, sequelize) => {
  const Treatment = sequelize.define(
    'treatment',
    {
      'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      user_id: Sequelize.INTEGER
    },
    {
      tableName: 'treatment',
      timestamps: false
    }
  );

  return Treatment;
}

export default define;