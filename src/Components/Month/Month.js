import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Week from '../Week';
import './Month.css';
import moment from 'moment';

class Month extends Component {
  render() {
    const {
      startMonth,
      onDayClick,
      IPOs,
    } = this.props;
    const formattedDate = startMonth.format('MMMM');
    const firstSunday = moment(startMonth).startOf('week');
    return (
      <div className="Month">
        <h2 className="month-label">{formattedDate}</h2>
        {Array.from(new Array(5)).map((_, weekDiff) => {
          const startDate = moment(firstSunday).add(weekDiff, 'week');

          return (
            <Week
              key={startDate.format('YYYY-MM-DD')}
              length={7}
              startDate={startDate}
              dayFormat={'D'}
              currentMonth={startMonth}
              onDayClick={onDayClick}
              IPOs={IPOs}
            />
          );
        })}
      </div>
    );
  }
}

Month.propTypes = {
  startMonth: (props, propName, componentName) => {
    if (!moment.isMoment(props[propName])) {
      throw new Error('date is not moment.');
    }
  },
  onDayClick: PropTypes.func,
  IPOs: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
};

export default Month;
