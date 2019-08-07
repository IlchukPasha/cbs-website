const visibilityPlugin = require('objection-visibility').default;
const { Model } = require('objection');

class User extends visibilityPlugin(Model) {
  static get tableName() {
    return 'sermons';
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    this.createdAt = new Date();
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    this.updatedAt = new Date();
  }
}

module.exports = User;