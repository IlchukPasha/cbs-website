const Password = require('objection-password')();
const visibilityPlugin = require('objection-visibility').default;
const { Model } = require('objection');

const { app: { roles } } = require('./../core/config');

class User extends Password(visibilityPlugin(Model)) {
  static get tableName() {
    return 'users';
  }

  static get hidden() {
    return ['password'];
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    if(!this.role){
      this.role = roles.user;
    }
    this.createdAt = new Date();
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    this.updatedAt = new Date();
  }
}

module.exports = User;