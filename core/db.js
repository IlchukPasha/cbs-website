const { Model } = require('objection');
const KnexInstance = require('knex');

const { database } = require('./../core/config');

const knex = KnexInstance(database);
Model.knex(knex);

module.exports = { knex };