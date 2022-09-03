module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["import", "@typescript-eslint"],
  "extends": [
    "airbnb-typescript"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "env": {
    "es2020": true,
    "browser": true
  },
  "rules": {
    "no-debugger": "off",
    "no-console": 0,
    "class-methods-use-this": "off",
    "@typescript-eslint/no-explicit-any": 2,
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ]
  },
  "overrides": [
    {
      "files": ['*.ts', '*.tsx'], 
      
      "parserOptions": {
        "project": ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      "rules": {
        "react/jsx-filename-extension": ['off']
      }
    },
  ],
}
