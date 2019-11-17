
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Dom', password: 'we8fw8fe'},
        {id: 2, username: 'Francis', password: '283d8h283d'},
        {id: 3, username: 'Anna', password: '1293982eds'}
      ]);
    });
};
