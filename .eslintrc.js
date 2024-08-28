module.exports = {
    root: true,
    extends: ['plugin:@next/next/recommended', '@payloadcms'],
    ignorePatterns: ['**/payload-types.ts'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'off', // Disable Prettier rule
      'no-console': 'off', // Disable no-console rule
      'no-unused-vars': 'off',
    }
  };