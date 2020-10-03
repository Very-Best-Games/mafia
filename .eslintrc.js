module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/react"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": "off",
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      env: {
        jest: true,
      },
    },
  ],
  globals: {
    fetch: "readonly",
  },
};
