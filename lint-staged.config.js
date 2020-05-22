module.exports = {
  "package.json": (files) => [
    ...files.map((file) => `sort-package-json ${file}`),
  ],
  "*.{js,ts}": (files) => `prettier --write ${files.join(" ")}`,
  "*.json": (files) => [...files.map((file) => `jsonlint ${file} -si`)],
  "*.*": (files) => [...files.map((file) => `git add ${file}`)],
};
