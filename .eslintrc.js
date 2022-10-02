module.exports = {
  extends: ["plugin:react/recommended", "airbnb", "prettier", "plugin:@typescript-eslint/recommended"],
  plugins: ["react", "@typescript-eslint", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  rules: {
    // It breaks some default cases for hooks in React e.g useDispatch https://github.com/typescript-eslint/typescript-eslint/issues/1184
    // "@typescript-eslint/no-floating-promises": "off",
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "react/require-default-props": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "import/extensions": [
      "error",
      {
        png: "always",
        svg: "always",
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
  },
};
