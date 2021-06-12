import moment from 'moment';
import { fetchIPOs } from './finnhub.js';

describe('Finnhub', () => {
  test('it should fetch IPOs for a date range', async () => {
    // Granted, I would be using fetchMock here, but for sanity's sake...
    const startDate = moment('2021-01-01');
    const endDate = moment('2021-01-04');
    const actualIPOs = await fetchIPOs(startDate, endDate);
    const actualIPONames = actualIPOs['2021-01-04'].map(IPO => IPO.symbol).join(',');
    const expectedIPONames = 'VINP,OCDX,NAACU,EUSGU';
    expect(JSON.stringify(actualIPONames)).toBe(JSON.stringify(expectedIPONames));
  });
});
