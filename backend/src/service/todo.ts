const todoService = (repository) => {
  return {
    getTodos: async () => {
      return await repository.getTodos()
    }
  };
};

module.exports = todoService;