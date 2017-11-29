export default {
  surgeons: (root, data, context) => {
    return context.model.Surgeon.findAll(undefined, context)//surgeonAuthPost(findAll(surgeonAuthPre(config))(Users))
  },

  treatments: (root, data, context) => {

  },

  treatmentsForSurgeon: (root, data, context) => {
    return context.model.Treatment.findAll({
      where: {
        user_id: data.surgeonId
      }
    }, context)///surgeonAuthPost(findAll(surgeonAuthPre(config))(Users))
  },

  me: (root, data, context) => context.user
}