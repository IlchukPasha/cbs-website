const { verify } = require('jsonwebtoken');

const validate = require('./../core/Validator');

module.exports = async (ctx, next) => {
  await validate(ctx.header, {
    'x-api-token': 'required|regex:/^Bearer\\s{1}([A-z\\.0-9-]+)$/'
  });
  const [, token] = ctx.header['x-api-token'].split(' ');

  const { data } = await verify(token, process.env.JWT_SECRET);

  ctx.state.user_id = data.id;
  await next();
};
