import { AgentRepository } from "../repository/AgentRepository.js";

export const AgentService = {
  getAll() {
    return AgentRepository.findAll();
  },
  getById(agentId) {
    return AgentRepository.findById(agentId);
  },
  create(data) {
    return AgentRepository.create(data);
  },
  update(agentId, data) {
    return AgentRepository.update(agentId, data);
  },
  delete(agentId) {
    return AgentRepository.delete(agentId);
  },
};
