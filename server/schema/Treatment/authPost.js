// type: permissionPermit AppContext -> OperationType -> Model -> bool 
const permit = (context) => (operation) => (object) => {
  switch(operation) {
    case 'READ': {
      if(context.user.role === 'MODERATOR')
        return true;

      return object.user_id === context.user.id;
    }

    case 'CREATE':
      return true;

    case 'UPDATE': {
      if(
        context.user.role === 'MODERATOR'
        || object.user_id === context.user.id
      )
        return true;

      return false;
    }

    default:
      return false;
  }
}

export default permit;