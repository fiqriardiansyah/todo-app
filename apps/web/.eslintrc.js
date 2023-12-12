/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ['@repo/eslint-config/next.js', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
    plugins: ['prettier'],
};
