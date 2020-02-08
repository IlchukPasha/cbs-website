exports.up = async knex => {
  await knex.schema.createTable('users', t => {
    t.increments();
    t.string('email', 100).notNullable().unique();
    t.string('password').notNullable();
    t.string('firstName', 100).notNullable();
    t.string('lastName', 100).notNullable();
    t.string('role').notNullable().default('user').comment('admin, user, moderator');
    t.timestamp('createdAt').nullable().defaultTo(null);
    t.timestamp('updatedAt').nullable().defaultTo(null);
    t.collate('utf8_general_ci');
  });

  await knex.schema.createTable('sermons', t => {
    t.increments();
    t.string('title', 100).notNullable();
    t.string('subject', 100).notNullable().comment('It is a sermon theme');
    t.string('speaker', 100).notNullable().comment('Speaker name');
    t.text('text').notNullable();
    t.date('date').notNullable();
    t.timestamp('createdAt').nullable().defaultTo(null);
    t.timestamp('updatedAt').nullable().defaultTo(null);
    t.collate('utf8_general_ci');
  });

  await knex.schema.createTable('events', t => {
    t.increments();
    t.string('title', 100).notNullable();
    t.string('address').notNullable();
    t.string('shortDescription', 150).notNullable();
    t.text('description').notNullable();
    t.date('date').notNullable();
    t.time('startedAt').comment('Example: 10:00:00').notNullable();
    t.time('finishedAt').comment('Example: 15:00:00').notNullable();
    t.timestamp('createdAt').nullable().defaultTo(null);
    t.timestamp('updatedAt').nullable().defaultTo(null);
    t.collate('utf8_general_ci');
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('users')
    .dropTableIfExists('sermons')
    .dropTableIfExists('events');
};
