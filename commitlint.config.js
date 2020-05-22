const {
  utils: { getPackages }
} = require('@commitlint/config-lerna-scopes')

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0, 'always', 128],
    'scope-enum': async ctx => [
      2,
      'always',
      [...(await getPackages(ctx))]
    ]
  }
}
