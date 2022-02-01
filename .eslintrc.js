module.exports = {
    extends: ['@react-native-community'],
    plugins: ['import', 'filenames'],
    env: {
        jest: true,
    },
    rules: {
        semi: 0,
        'no-console': 'warn',

        // Prevent direct mutation of this.state
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-direct-mutation-state': 'error',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
        'react/jsx-sort-props': [
            'error',
            {
                noSortAlphabetically: false,
                reservedFirst: true,
                shorthandFirst: true,
                callbacksLast: true,
            },
        ],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
        'react/sort-prop-types': [
            'error',
            {
                noSortAlphabetically: true,
                requiredFirst: false,
                callbacksLast: false,
            },
        ],

        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/sort-comp.md
        // 'react/sort-comp': [
        //     'warn',
        //     {
        //         order: [
        //             'static-variables',
        //             'static-methods',
        //             'instance-variables',
        //             'lifecycle',
        //             'getters',
        //             'setters',
        //             'instance-methods',
        //             '/^(on|handle).+$/',
        //             'everything-else',
        //             '/^render.+$/',
        //             'render',
        //         ],
        //         groups: {
        //             lifecycle: [
        //                 'state',
        //                 'constructor',
        //                 'getDerivedStateFromProps',
        //                 'componentWillMount',
        //                 'UNSAFE_componentWillMount',
        //                 'componentDidMount',
        //                 'componentWillReceiveProps',
        //                 'UNSAFE_componentWillReceiveProps',
        //                 'shouldComponentUpdate',
        //                 'componentWillUpdate',
        //                 'UNSAFE_componentWillUpdate',
        //                 'getSnapshotBeforeUpdate',
        //                 'componentDidUpdate',
        //                 'componentDidCatch',
        //                 'componentWillUnmount',
        //             ],
        //         },
        //     },
        // ],

        // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
        'import/first': 'error',
        'import/no-amd': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/no-duplicates': 1,
        'import/extensions': [
            1,
            { js: 'never', json: 'always', svg: 'always', png: 'always', jpg: 'always' },
        ],
        'import/newline-after-import': 1,
        'import/no-unassigned-import': 1,
        'import/no-named-default': 1,
        'import/dynamic-import-chunkname': 1,
        'import/no-absolute-path': 'error',
        'import/order': [
            1,
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'import/prefer-default-export': 0,
        'react/prop-types': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'filenames/match-exported': 'error',
        radix: 'error',
        curly: 0,
        'no-shadow': 0,
        'react-native/no-inline-styles': 0,
        'react/no-did-update-set-state': 0,
        'eslint-comments/no-unused-disable': 'error',
    },
    overrides: [
        {
            files: ['e2e/**/*.js'],
            globals: {
                by: true,
                device: true,
                element: true,
                waitFor: true,
                jasmine: true,
            },
        },
    ],
}
