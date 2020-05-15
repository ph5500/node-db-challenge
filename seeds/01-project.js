
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { name: "Get through sprint challenge" },
        { name: 'Planting seeds', description: 'growing things for the spring' }
      ]);
    });
};
