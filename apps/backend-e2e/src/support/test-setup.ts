/* eslint-disable */
declare global {
  // eslint-disable-next-line no-var
  var __BACKEND_BASE_URL__: string | undefined;
}

module.exports = async function () {
  // Configure base URL for tests.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3000';
  globalThis.__BACKEND_BASE_URL__ = `http://${host}:${port}`;
};
