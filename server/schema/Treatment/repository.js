import initModel from './model';
import authPre from './authPre';
import authPost from './authPost';

const initRepo = (Sequelize, sequelize) => {
  const Treatment = initModel(Sequelize, sequelize);

  const findAll = async (config, context) => {
    const configAfterAuth = authPre(context)('READ')(config);
    if(configAfterAuth === false) return [];

    const objects = await Treatment.findAll(configAfterAuth);
  
    const treatmentsFiltered = 
      objects.filter(
        object => 
          authPost(context)('READ')(object)
      );

      console.log('Treatments after filter:', treatmentsFiltered);

    return treatmentsFiltered;
  };

  return {
    findAll
  };
}

export default initRepo;
