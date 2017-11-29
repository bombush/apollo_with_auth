import initModel from './model';
//import authPre from './authPre';
//import authPost from './authPost';

const initRepo = (Sequelize, sequelize) => {
  const Procedure = initModel(Sequelize, sequelize);

  /*const findAll = (config, context) => {
    const configAfterAuth = authPre(context)('READ')(config);
    if(configAfterAuth === false) return [];

    const objects = Users.findAll(configAfterAuth);
    const permittedObjects =
      objects.filter(
        object => 
          authPost(context)('READ')(object) ? object : null
      );

    console.log('PErmitted users:', permittedObjects);
    return permittedObjects;
  };*/
  const create = (config, context) => {
    return Procedure.create(config);
  }

  return {
    create
  };
}

export default initRepo;
