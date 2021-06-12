import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Day.css';
import moment from 'moment';

class Day extends Component {
  render() {
    const {
      date,
      format,
      isGhosted,
      onClick,
      IPOs = [],
    } = this.props;
    const formattedDate = date.format(format);
    return (
      <div
        className={classnames({
          Day: true,
          isGhosted,
          hasIPOs: IPOs.length > 0,
        })}
        onClick={() => onClick(date)}
      >
        <h3 className="date">{formattedDate}</h3>
        {IPOs.length === 0 && (
          <p className="no-ipos-message">n/a</p>
        )}
        {IPOs.length > 0 && (
          <ul className="ipos">
            {IPOs.map(IPO => <li key={IPO.symbol}>{IPO.symbol}</li>)}
          </ul>
        )}
      </div>
    );
  }
}

Day.propTypes = {
  date: (props, propName, componentName) => {
    if (!moment.isMoment(props[propName])) {
      throw new Error('date is not moment.');
    }
  },
  format: PropTypes.string,
  isGhosted: PropTypes.bool,
  onClick: PropTypes.func,
  IPOs: PropTypes.arrayOf(PropTypes.object),
};

export default Day;
