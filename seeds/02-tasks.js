
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { description: 'Get some jalapeno, cucumber, and tomato seeds', completed: true, project_id: 2 },
        { description: 'Put the seeds in fertile soil', project_id: 2 },
        { description: 'Plants are now starting to grow.', project_id: 2 },
        { description: 'Get through sprint challenge', project_id: 1 },
        { description: 'push my code', project_id: 1 },
        { description: 'submit sprint retrospective', project_id: 1 },
      ]);
    });
};
