module.exports = {
  'package.json': files => [
    ...files.map(file => `sort-package-json ${file}`)
  ],
  '*.js': files => [
    ...files.map(file => `standard ${file} --env jest --fix`)
  ],
  '*.json': files => [
    ...files.map(file => `jsonlint ${file} -si`)
  ],
  '*.*': files => [
    ...files.map(file => `git add ${file}`)
  ]
}
