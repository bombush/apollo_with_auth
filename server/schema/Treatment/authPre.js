const authPre = context => operation => queryConfig => {
  switch(operation) {
    case 'READ':{
      if(context.user.role === 'MODERATOR')
        return queryConfig;

      // non-MODERATOR users can see only treatments they own
      return {
        ...queryConfig,
         where: 
        { 
          user_id : context.user.id, 
          $and: {...queryConfig.where } 
        }
      }
      /*return Object.assign(queryConfig, { 
        where: Object.assign( queryConfig.where, { 
          $and: {
            user_id : context.user.id 
          }
        } )
      });*/
      //return queryConfig;
    }
      
    case 'CREATE':
      return true;

    case 'UPDATE': {
      if(
        context.user.role === 'MODERATOR'
      )
        return queryConfig;

      queryConfig.where = Object.assign(queryConfig.where, { user_id: context.user.id });
      return queryConfig;
    }

    default:
      return false;
  }
}

export default authPre;