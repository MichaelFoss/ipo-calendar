import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Calendar.css';
import VIEWS from '../../Lib/views';
import moment from 'moment';
import ViewSelector from '../ViewSelector';
import Week from '../Week';
import Month from '../Month';
import DatePicker from '../DatePicker';

class Calendar extends Component {
  updateStartDate = (length, unit) => {
    const {
      onChangeStartDate,
      startDate,
    } = this.props;
    const newStartDate = moment(startDate).add(length, unit);
    onChangeStartDate(newStartDate);
  };

  render() {
    const {
      isDisabled,
      onDayClick,
      onChangeView,
      startDate,
      activeView,
      IPOs,
    } = this.props;

    return (
      <div className={classnames({
        Calendar: true,
        DayView: activeView === VIEWS.DAY,
        WeekView: activeView === VIEWS.WEEK,
        WorkWeekView: activeView === VIEWS.WORKWEEK,
        MonthView: activeView === VIEWS.MONTH,
      })}>
        <ViewSelector
          activeView={activeView}
          onChangeView={onChangeView}
          isDisabled={isDisabled}
        />

        {/* DAY */}
        {activeView === VIEWS.DAY && (
          <>
            <DatePicker
              label={startDate.format('YYYY-MM-DD')}
              onPrevious={() => this.updateStartDate(-1, 'days')}
              onNext={() => this.updateStartDate(1, 'days')}
              isDisabled={isDisabled}
            />
            <Week
              length={1}
              startDate={startDate}
              dayFormat="dddd, MMM. D"
              onDayClick={onDayClick}
              IPOs={IPOs}
            />
          </>
        )}

        {/* WORKWEEK */}
        {activeView === VIEWS.WORKWEEK && (
          <>
            <DatePicker
              label={`${startDate.format('YYYY-MM-DD')} - ${moment(startDate).add(4, 'day').format('YYYY-MM-DD')}`}
              onPrevious={() => this.updateStartDate(-1, 'week')}
              onNext={() => this.updateStartDate(1, 'week')}
              isDisabled={isDisabled}
            />
            <Week
              length={5}
              startDate={startDate}
              dayFormat="ddd., M/D"
              onDayClick={onDayClick}
              IPOs={IPOs}
            />
          </>
        )}

        {/* WEEK */}
        {activeView === VIEWS.WEEK && (
          <>
            <DatePicker
              label={`${startDate.format('YYYY-MM-DD')} - ${moment(startDate).add(6, 'day').format('YYYY-MM-DD')}`}
              onPrevious={() => this.updateStartDate(-1, 'week')}
              onNext={() => this.updateStartDate(1, 'week')}
              isDisabled={isDisabled}
            />
            <Week
              length={7}
              startDate={startDate}
              dayFormat="ddd., M/D"
              onDayClick={onDayClick}
              IPOs={IPOs}
            />
          </>
        )}

        {/* MONTH */}
        {activeView === VIEWS.MONTH && (
          <>
            <DatePicker
              label={startDate.format('MMM YYYY')}
              onPrevious={() => this.updateStartDate(-1, 'month')}
              onNext={() => this.updateStartDate(1, 'month')}
              isDisabled={isDisabled}
            />
            <Month
              startMonth={startDate}
              onDayClick={onDayClick}
              IPOs={IPOs}
            />
          </>
        )}
      </div>
    );
  }
}

Calendar.propTypes = {
  isDisabled: PropTypes.bool,
  onDayClick: PropTypes.func,
  IPOs: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
  onChangeStartDate: PropTypes.func,
  onChangeView: PropTypes.func,
  startDate: (props, propName, componentName) => {
    if (!moment.isMoment(props[propName])) {
      throw new Error(`${propName} is not moment.`);
    }
  },
  activeView: PropTypes.string,
};

export default Calendar;
