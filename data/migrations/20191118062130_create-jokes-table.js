exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table
        .string("username")
        .notNullable()
        .unique();
      table.string("password").notNullable();
      table
        .string("email")
        .unique()
        .notNullable();
    })
    .createTable("jokes", table => {
      table.increments();
      table.string("setup").notNullable();
      table.string("punchline").notNullable();
      table.boolean("public").defaultTo(true);
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('jokes')
};
