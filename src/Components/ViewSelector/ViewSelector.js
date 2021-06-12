import React from 'react';
import PropTypes from 'prop-types';
import VIEWS from '../../Lib/views.js';
import './ViewSelector.css';

const ViewSelector = props => {
  const {
    isDisabled,
    activeView,
    onChangeView,
  } = props;

  return (
    <select
      disabled={isDisabled}
      className="ViewSelector"
      onChange={e => onChangeView(e.target.value)}
      value={activeView}
    >
      <option value={VIEWS.DAY}>Day</option>
      <option value={VIEWS.WORKWEEK}>Work Week</option>
      <option value={VIEWS.WEEK}>Week</option>
      <option value={VIEWS.MONTH}>Month</option>
    </select>
  );
};

ViewSelector.propTypes = {
  isDisabled: PropTypes.bool,
  activeView: PropTypes.string,
  onChangeView: PropTypes.func,
};

export default ViewSelector;
