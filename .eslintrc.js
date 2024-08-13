PAYLOAD_CLOUD_PROJECT_ID=
PAYLOAD_CLOUD_BUCKET=module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', '@payloadcms'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'off', // Disable Prettier rule
    'no-console': 'off', // Disable no-console rule
    'no-unused-vars': 'off', // Disable no-unused-vars rule
    // Add any other rules you want to disable here
  },
};