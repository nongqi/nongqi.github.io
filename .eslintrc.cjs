/*
 * @Author: nongqi
 * @Date: 2022-11-22 01:42:16
 * @LastEditTime: 2022-11-22 03:45:18
 * @LastEditors: nongqi
 * @Description:
 */
module.exports = {
  extends: 'eslint-config-sprite',
  env: {
    browser: true,
  },
  plugins: ['html'],
  rules: {
    complexity: ['warn', 25],
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'no-func-assign': 'off',
    'no-console': 'off',
    'linebreak-style': [0, 'error', 'window'],
    'keyword-spacing': ['error', { before: true }],
    'object-curly-spacing': ['error', 'always'],
  },
};
