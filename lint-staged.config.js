module.exports = {
  'package.json': files => [
    ...files.map(file => `sort-package-json ${file}`),
    ...files.map(file => `git add ${file}`)
  ],
  '*.js': files => [
    ...files.map(file => `standard ${file} --env jest --fix`),
    ...files.map(file => `git add ${file}`)
  ],
  '*.json': files => [
    ...files.map(file => `jsonlint ${file} -si`),
    ...files.map(file => `git add ${file}`)
  ]
}
