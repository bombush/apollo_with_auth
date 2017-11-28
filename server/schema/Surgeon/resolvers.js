export default {
  treatments:
    (root, data, context) => {
      return context.model.Treatment.findAll({
        where: {
          user_id: root.id
        }
      }, context) || [];
    }
};
