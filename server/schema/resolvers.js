export default {
  Query: {
    surgeons: (root, data, context) => {
      return context.model.Surgeon.findAll(undefined, context)//surgeonAuthPost(findAll(surgeonAuthPre(config))(Users))
    },

    treatmentsForSurgeon: (root, data, context) => {
      return context.model.Treatment.findAll({
        where: {
          user_id: data.surgeonId
        }
      }, context)///surgeonAuthPost(findAll(surgeonAuthPre(config))(Users))
    },
  },

  Surgeon: {
    treatments:
      (root, data, context) => {
        return context.model.Treatment.findAll({
          where: {
            user_id: root.id
          }
        }, context) || [];
      }
  }
}
