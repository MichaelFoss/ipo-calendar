import moment from 'moment';
import VIEWS from '../Lib/views';
import { getVisibleDates } from './dates';

/**
 * Compares the lengths of two arrays
 * and their first & last elements.
 * @param {string[]} a
 * @param {string[]} b
 */
const testArrays = (actual, expected) => {
  expect(actual.length).toBe(expected.length);
  expect(actual[0]).toBe(expected[0]);
  expect(actual[actual.length - 1]).toBe(expected[expected.length - 1]);
};

describe('Lib: dates', () => {
  describe('Day', () => {
    it('should get the day of the week', () => {
      const day = moment('2021-05-26'); // Wed.
      const expected = ['2021-05-26'];
      const actual = getVisibleDates(day, VIEWS.DAY);
      testArrays(actual, expected);
    });
  });

  describe('Week', () => {
    const expectedSameMonth = [
      '2021-05-23',
      '2021-05-24',
      '2021-05-25',
      '2021-05-26',
      '2021-05-27',
      '2021-05-28',
      '2021-05-29',
    ];

    const expectedBrokenMonth = [
      '2021-05-30',
      '2021-05-31',
      '2021-06-01',
      '2021-06-02',
      '2021-06-03',
      '2021-06-04',
      '2021-06-05',
    ];

    it('should get the entire week for a mid day request', () => {
      const day = moment('2021-05-26'); // Wed.
      const actual = getVisibleDates(day, VIEWS.WEEK);
      testArrays(actual, expectedSameMonth);
    });

    it('should get the entire week for a Sunday request', () => {
      const day = moment('2021-05-23'); // Sun.
      const actual = getVisibleDates(day, VIEWS.WEEK);
      testArrays(actual, expectedSameMonth);
    });

    it('should get the entire week for a Saturday request', () => {
      const day = moment('2021-05-29'); // Sat.
      const actual = getVisibleDates(day, VIEWS.WEEK);
      testArrays(actual, expectedSameMonth);
    });

    it('should get the rest of this month through next month\'s week for this month day\'s request', () => {
      const day = moment('2021-05-31'); // Mon.
      const actual = getVisibleDates(day, VIEWS.WEEK);
      testArrays(actual, expectedBrokenMonth);
    });

    it('should get the rest of this month through next month\'s week for this month day\'s request', () => {
      const day = moment('2021-06-02'); // Wed.
      const actual = getVisibleDates(day, VIEWS.WEEK);
      testArrays(actual, expectedBrokenMonth);
    });
  });

  describe('Work Week', () => {
    const expectedSameMonth = [
      '2021-05-24',
      '2021-05-25',
      '2021-05-26',
      '2021-05-27',
      '2021-05-28',
    ];

    const expectedBrokenMonth = [
      '2021-05-31',
      '2021-06-01',
      '2021-06-02',
      '2021-06-03',
      '2021-06-04',
    ];

    it('should get the entire work week for a mid day request', () => {
      const day = moment('2021-05-26'); // Wed.
      const actual = getVisibleDates(day, VIEWS.WORKWEEK);
      testArrays(actual, expectedSameMonth);
    });

    it('should get the entire work week for a Sunday request', () => {
      const day = moment('2021-05-23'); // Sun.
      const actual = getVisibleDates(day, VIEWS.WORKWEEK);
      testArrays(actual, expectedSameMonth);
    });

    it('should get the entire work week for a Monday request', () => {
      const day = moment('2021-05-24'); // Mon.
      const actual = getVisibleDates(day, VIEWS.WORKWEEK);
      testArrays(actual, expectedSameMonth);
    });

    it('should get the entire work week for a Friday request', () => {
      const day = moment('2021-05-28'); // Fri.
      const actual = getVisibleDates(day, VIEWS.WORKWEEK);
      testArrays(actual, expectedSameMonth);
    });

    it('should get the entire work week for a Saturday request', () => {
      const day = moment('2021-05-29'); // Sat.
      const actual = getVisibleDates(day, VIEWS.WORKWEEK);
      testArrays(actual, expectedSameMonth);
    });

    it('should get the rest of this month through next month\'s work week for this month day\'s request', () => {
      const day = moment('2021-05-31'); // Mon.
      const actual = getVisibleDates(day, VIEWS.WORKWEEK);
      testArrays(actual, expectedBrokenMonth);
    });

    it('should get the rest of this month through next month\'s work week for this month day\'s request', () => {
      const day = moment('2021-06-02'); // Wed.
      const actual = getVisibleDates(day, VIEWS.WORKWEEK);
      testArrays(actual, expectedBrokenMonth);
    });
  });

  describe('Month', () => {
    describe('1st of month is a Sunday', () => {
      // Load up all of Aug. plus first days of Sept.
      // 08/01-09/04 (2021)
      const expected = [];
      for (
        let day = moment('2021-08-01');
        !(day.format('MM') === '09' && day.format('dd') === 'Su');
        day.add(1, 'days')
      ) {
        expected.push(day.format('YYYY-MM-DD'));
      }

      it('should get a month of dates starting on the 1st of the month', () => {
        const day = moment('2021-08-01');
        const actual = getVisibleDates(day, VIEWS.MONTH);
        testArrays(actual, expected);
      });

      it('should get a month of dates starting on the last of the month', () => {
        const day = moment('2021-08-30');
        const actual = getVisibleDates(day, VIEWS.MONTH);
        testArrays(actual, expected);
      });

      it('should get a month of dates starting on the middle of the month', () => {
        const day = moment('2021-08-15');
        const actual = getVisibleDates(day, VIEWS.MONTH);
        testArrays(actual, expected);
      });
    });

    describe('Last of month is a Saturday', () => {
      // Load up last days of Sept. plus all of October
      // 09/27-10/31 (2020)
      const expected = [];
      for (
        let day = moment('2020-09-27');
        !(day.format('MM') === '11' && day.format('dd') === 'Su');
        day.add(1, 'days')
      ) {
        expected.push(day.format('YYYY-MM-DD'));
      }

      it('should get a month of dates starting on the 1st of the month', () => {
        const day = moment('2020-10-01');
        const actual = getVisibleDates(day, VIEWS.MONTH);
        testArrays(actual, expected);
      });

      it('should get a month of dates starting on the last of the month', () => {
        const day = moment('2020-10-31');
        const actual = getVisibleDates(day, VIEWS.MONTH);
        testArrays(actual, expected);
      });

      it('should get a month of dates starting on the middle of the month', () => {
        const day = moment('2020-10-15');
        const actual = getVisibleDates(day, VIEWS.MONTH);
        testArrays(actual, expected);
      });
    });
  });
});
