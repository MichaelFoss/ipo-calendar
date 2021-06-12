import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = props => {
  const {
    isOpen,
    children,
    title,
    onClose,
  } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="Modal">
      <div className="overlay" />
      <div className="frame">
        {title && <h2 className="title">{title}</h2>}
        <button className="close-icon" onClick={onClose} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
