import React from 'react';
import PropTypes from 'prop-types';
import './DatePicker.css';

const DatePicker = (props) => {
  const {
    onPrevious,
    onNext,
    label,
    isDisabled,
  } = props;

  return (
    <div className="DatePicker">
      <button
        disabled={isDisabled}
        onClick={onPrevious}
      >
        &lt;
      </button>
      <span className="label">{label}</span>
      <button
        disabled={isDisabled}
        onClick={onNext}
      >
        &gt;
      </button>
    </div>
  );
};

DatePicker.propTypes = {
  isDisabled: PropTypes.bool,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default DatePicker;
