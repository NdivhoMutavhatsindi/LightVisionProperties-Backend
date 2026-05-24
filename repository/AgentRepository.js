import { prisma } from "../config/prisma.js";

export const AgentRepository = {
  findAll() {
    return prisma.agents.findMany({ orderBy: { created_at: "desc" } });
  },

  findById(agentId) {
    return prisma.agents.findUnique({ where: { agent_id: agentId } });
  },

  create(data) {
    return prisma.agents.create({ data });
  },

  update(agentId, data) {
    return prisma.agents.update({ where: { agent_id: agentId }, data });
  },

  delete(agentId) {
    return prisma.agents.delete({ where: { agent_id: agentId } });
  },
};
