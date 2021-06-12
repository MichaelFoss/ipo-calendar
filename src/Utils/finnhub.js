import moment from 'moment';
import fetch from './fetch.js';

const dateFormat = 'YYYY-MM-DD';

/**
 * Returns all IPOs for a date range in an object
 * keyed by YYYY-MM-DD.
 * @param {Moment} startDateMoment
 * @param {Moment} endDateMoment
 */
const fetchIPOs = async (startDateMoment, endDateMoment) => {
  // Create an IPOs object keyed with all requested dates
  const IPOs = {};
  const dayIterator = moment(startDateMoment);
  IPOs[dayIterator.format('YYYY-MM-DD')] = [];
  while (!dayIterator.isSame(endDateMoment)) {
    dayIterator.add(1, 'days');
    IPOs[dayIterator.format('YYYY-MM-DD')] = [];
  }

  // Request the IPOs
  const startDate = startDateMoment?.format(dateFormat) || '';
  const endDate = endDateMoment?.format(dateFormat) || '';
  const url = `https://finnhub.io/api/v1/calendar/ipo?from=${startDate}&to=${endDate}`;
  const response = await fetch(url);

  // Populate the IPOs object with the responses
  for (const IPO of (response?.ipoCalendar || [])) {
    if (IPO.symbol) {
      IPOs[IPO.date].push(IPO);
    }
  }
  return IPOs;
};

export {
  fetchIPOs,
};
