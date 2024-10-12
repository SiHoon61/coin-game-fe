import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactLint from 'eslint-plugin-react';
import tanstack from '@tanstack/eslint-plugin-query';
import prettier from 'eslint-config-prettier';
import noRelativePath from 'eslint-plugin-no-relative-import-paths';
import checkFile from 'eslint-plugin-check-file';
import curaLint from 'eslint-plugin-cura';

/**
 * 기본구성 : eslint(recommended), typescript-eslint(recommended), reactHooks(recomended), reactRefresh
 * 추가 : react(recommended), react-query(recommended), prettier(rule 충돌 제거)
 */

const baseConfig = tseslint.config(
  { ignores: ['dist', '**/*.d.ts', '**/App.tsx', '**/main.tsx', '*.config.ts', '*.config.js'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser, // 브라우저에서 기본적으로 제공하는 window, document, navigator 등의 객체를 전역 변수로 인식하도록
    },
    plugins: {
      react: reactLint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@tanstack/query': tanstack,
      'import-path': noRelativePath,
      'check-file': checkFile,
      cura: curaLint,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactLint.configs.recommended.rules,
      ...tanstack.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // react component외 export 금지 규칙 (warning , 컴포넌트 외 변수/함수 export 허용)
      '@typescript-eslint/no-unused-vars': 'warn', // 미사용 변수 금지 규칙 (warning)
      '@typescript-eslint/no-explicit-any': 'off', // any type 사용 금지 규칙 (비활성)
      'react/react-in-jsx-scope': 'off', // React 명시적 import 규칙 (비활성)
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // unknown property 금지 규칙 (활성, css 예외)

      // 같은 폴더인 경우를 제외하고 import 경로는 항상 절대 경로를 사용
      'import-path/no-relative-import-paths': ['warn', { allowSameFolder: true, rootDir: 'src' }],

      // 식별자의 최소 길이를 2로 설정
      'id-length': ['warn', { min: 2, exceptions: ['_', 'e'] }],

      // 식별자에 My, Custom 포함 금지
      'id-match': ['warn', '^(?!.*(My|my|Custom|CUSTOM|custom)).*$'],

      // 식별자 대소문자 규칙
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike', // interface, type, class 등
          format: ['PascalCase'],
        },
      ],

      // export default 사용 금지
      'no-restricted-exports': ['warn', { restrictDefaultExports: { direct: true } }],

      // export function 사용 금지
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'ExportNamedDeclaration > FunctionDeclaration',
          message: 'Separate the export statement from the function declaration.',
        },
      ],

      // 파일명 규칙
      'check-file/filename-naming-convention': [
        'warn',
        {
          '**/*.{jsx,tsx}': 'PASCAL_CASE',
          '**/*.{js,ts}': 'CAMEL_CASE',
        },
      ],

      // 폴더명 규칙
      'check-file/folder-naming-convention': [
        'warn',
        {
          'src/**/': 'KEBAB_CASE', // src 폴더 아래의 모든 폴더는 KEBAB-CASE 사용
        },
      ],

      // custom rules
      // JSXElement 리턴 여부로 컴포넌트 판단.
      'cura/no-lowercase-function-jsx-returns': 'warn',

      // custom rules
      // styled 사용금지
      'cura/no-emotion-styled': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
);

// eslint-config-prettier 설정 추가
const integratedConfig = [...baseConfig, prettier];

export default integratedConfig;
