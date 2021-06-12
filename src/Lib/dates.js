import moment from 'moment';
import VIEWS from './views';

const getStartDate = (currentDate, view) => {
  switch (view) {
    case VIEWS.MONTH:
      return moment(currentDate).startOf('month');

    case VIEWS.WORKWEEK:
      return moment(currentDate).startOf('week').add(1, 'days');

    case VIEWS.WEEK:
      return moment(currentDate).startOf('week');

    case VIEWS.DAY:
    default:
      return moment(currentDate);
  }
};

const getVisibleDates = (startDate, view) => {
  const dates = [];
  switch (view) {
    case VIEWS.DAY:
      dates.push(startDate.format('YYYY-MM-DD'));
      break;

    case VIEWS.WEEK:
      const weekDay = getStartDate(startDate, view);
      for (let day = 0; day < 7; day++) {
        dates.push(weekDay.format('YYYY-MM-DD'));
        weekDay.add(1, 'day');
      }
      break;

    case VIEWS.WORKWEEK:
      const workWeekDay = getStartDate(startDate, view);
      for (let day = 0; day < 5; day++) {
        dates.push(workWeekDay.format('YYYY-MM-DD'));
        workWeekDay.add(1, 'days');
      }
      break;

    case VIEWS.MONTH:
      const monthDay = getStartDate(startDate, view).startOf('week');
      while (monthDay.format('DD') !== '02') {
        dates.push(monthDay.format('YYYY-MM-DD'));
        monthDay.add(1, 'days');
      }
      while (monthDay.format('DD') !== '01') {
        dates.push(monthDay.format('YYYY-MM-DD'));
        monthDay.add(1, 'days');
      }
      // Add every day up to and including the next Saturday
      while (monthDay.format('dd') !== 'Su') {
        dates.push(monthDay.format('YYYY-MM-DD'));
        monthDay.add(1, 'days');
      }
      break;

    default:
      break;
  }

  return dates;
};

export {
  getStartDate,
  getVisibleDates,
};
