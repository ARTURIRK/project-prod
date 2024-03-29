module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'relative-path-arturts',
        'unused-imports',
    ],
    rules: {
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn'],
        'react/require-default-props': 'off',
        'react/jsx-no-bind': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-param-reassign': 'off',
        'react/destructuring-assignment': 'off',
        'react/no-unstable-nested-components': 'warn',
        'linebreak-style': 'off',
        'no-undef': 'off',
        'react/function-component-definition': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-max-props-per-line': ['error', { maximum: 3 }],
        'no-shadow': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'unused-imports/no-unused-imports': 'error',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'react/no-array-index-key': 'off',
        'relative-path-arturts/path-checker': ['error', { alias: '@' }],
        'relative-path-arturts/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: [
                    '**/*.test.*',
                    '**/*.stories.*',
                    '**/StoreDecorator.tsx',
                ],
            },
        ],
        'relative-path-arturts/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'feature',
                    'color',
                    'size',
                    'variant',
                    'wrap',
                    'to',
                    'target',
                    'justify',
                    'align',
                    'direction',
                    'border',
                    'gap',
                    'role',
                    'as',
                ],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 140 }],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
