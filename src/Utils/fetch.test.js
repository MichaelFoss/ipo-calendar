import fetch from './fetch.js';

describe('Fetch', () => {
  test('it should fetch company data for Apple', async () => {
    const url = 'https://finnhub.io/api/v1/stock/profile2?symbol=AAPL';
    const response = await fetch(url);
    const appleCompanyName = 'Apple Inc';
    expect(response.name).toBe(appleCompanyName);
  });
});
