module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  parser: "babel-eslint",
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {},
};
