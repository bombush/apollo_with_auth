import createSurgeonRepo from './schema/Surgeon/repository';
import createTreatmentRepo from './schema/Treatment/repository';

const prepareRepositories = (Sequelize, sequelize) => {

    const Surgeon = createSurgeonRepo(Sequelize, sequelize);
    const Treatment = createTreatmentRepo(Sequelize, sequelize);

    return {
      Surgeon,
      Treatment
    };
  };
  
  export default prepareRepositories;