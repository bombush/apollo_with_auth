import createSurgeonRepo from './schema/Surgeon/repository';
import createTreatmentRepo from './schema/Treatment/repository';
import createProcedureRepo from './schema/Procedure/repository';
import createPatientRepo from './schema/Patient/repository';

const prepareRepositories = (Sequelize, sequelize) => {

    const Surgeon = createSurgeonRepo(Sequelize, sequelize);
    const Treatment = createTreatmentRepo(Sequelize, sequelize);
    const Procedure = createProcedureRepo(Sequelize, sequelize);
    const Patient = createPatientRepo(Sequelize, sequelize);


    return {
      Surgeon,
      Treatment,
      Procedure,
      Patient
    };
  };
  
  export default prepareRepositories;