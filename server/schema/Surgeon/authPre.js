const authPre = context => operation => queryConfig => {
  switch(operation) {
    case 'READ':
      return queryConfig;
      
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