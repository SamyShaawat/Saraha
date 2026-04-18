const { composePlugins, withNx } = require('@nx/webpack');
const { join } = require('path');

module.exports = composePlugins(withNx(), (config) => {
  config.context = __dirname; // CRITICAL: Fixes the relative path resolution issue
  if (!config.output) config.output = {};
  config.output.path = join(__dirname, '../../dist/apps/backend');
  return config;
});
