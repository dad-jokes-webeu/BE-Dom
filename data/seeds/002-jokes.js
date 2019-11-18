
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jokes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('jokes').insert([
        {id: 1, setup: 'Why did the chicken cross the road?', punchline: 'To get to the other side', public: true, user_id: 1},
      ]);
    });
};
