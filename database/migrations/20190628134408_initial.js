exports.up = async knex => {
  await knex.schema.createTable('users', t => {
    t.increments();
    t.string('email', 100).notNullable().unique();
    t.string('password').notNullable();
    t.string('first_name', 100).notNullable();
    t.string('last_name', 100).notNullable();
    t.string('role').notNullable().comment('admin, user, moderator');
    t.timestamps();
    t.collate('utf8_general_ci');
  });

  await knex.schema.createTable('sermons', t => {
    t.increments();
    t.string('title', 100).notNullable();
    t.string('subject', 100).notNullable().comment('It is a sermon theme');
    t.string('speaker', 100).notNullable().comment('Speaker name');
    t.text('description').notNullable();
    t.dateTime('date').notNullable();
    t.timestamps();
    t.collate('utf8_general_ci');
  });

  await knex.schema.createTable('events', t => {
    t.increments();
    t.string('title', 100).notNullable();
    t.string('address').notNullable();
    t.string('short_description', 150).notNullable();
    t.text('description').notNullable();
    t.dateTime('date').notNullable();
    t.time('started_at').comment('Example: 10:00').notNullable();
    t.time('finished_at').comment('Example: 15:00').notNullable();
    t.timestamps();
    t.collate('utf8_general_ci');
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('users')
    .dropTableIfExists('sermons')
    .dropTableIfExists('events');
};
