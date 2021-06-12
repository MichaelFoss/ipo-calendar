import React from 'react';
import PropTypes from 'prop-types';
import Day from '../Day';
import moment from 'moment';
import './Week.css';

const Week = (props) => {
  const {
    length,
    startDate,
    dayFormat,
    currentMonth,
    onDayClick,
    IPOs,
  } = props;

  let activeMonth = null;
  if (moment.isMoment(currentMonth)) {
    activeMonth = currentMonth.month();
  }

  return (
    <div className="Week">
      {Array.from(new Array(length)).map((_, dayDiff) => {
        const date = moment(startDate).add(dayDiff, 'day');
        const dateKey = date.format('YYYY-MM-DD');

        return (
          <Day
            key={dateKey}
            date={date}
            format={dayFormat}
            isGhosted={activeMonth !== null && date.month() !== activeMonth}
            onClick={onDayClick}
            IPOs={IPOs[dateKey]}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  length: PropTypes.number.isRequired,
  startDate: (props, propName) => {
    if (!moment.isMoment(props[propName])) {
      throw new Error(`${propName} is not moment.`);
    }
  },
  dayFormat: PropTypes.string,
  currentMonth: (props, propName) => {
    if (!!props[propName] && !moment.isMoment(props[propName])) {
      throw new Error(`${propName} is defined but not moment.`);
    }
  },
  onDayClick: PropTypes.func,
  IPOs: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
};

export default Week;
