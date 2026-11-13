import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['**/dist', '**/cdk.out']),
    {
        files: ['**/*.{js,ts,tsx}'],
        extends: [js.configs.recommended, tseslint.configs.recommended],
        plugins: { '@stylistic': stylistic },
        rules: {
            '@stylistic/semi': 'error',
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/eol-last': 'error',
        },
    },
    {
        files: ['packages/site/src/**/*.{ts,tsx}'],
        extends: [reactHooks.configs.flat['recommended-latest']],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ['packages/api/**', 'packages/site/*.ts', '*.js'],
        languageOptions: { globals: globals.node },
    },
]);
