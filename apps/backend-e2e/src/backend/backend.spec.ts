declare global {
  // eslint-disable-next-line no-var
  var __BACKEND_BASE_URL__: string | undefined;
}

describe('GET /api', () => {
  it('should return a message', async () => {
    const response = await fetch(`${globalThis.__BACKEND_BASE_URL__}/api`);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ message: 'Hello API' });
  });
});
