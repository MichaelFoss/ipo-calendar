import React from 'react';
import PropTypes from 'prop-types';
import './IPODetails.css';
import commaNumber from 'comma-number';

const IPODetails = props => {
  const {
    symbol,
    exchange,
    name,
    numberOfShares,
    price,
    status,
    totalSharesValue,
  } = props.IPO;
  return (
    <details className="IPODetails">
      <summary>{symbol}</summary>
      <dl className="details">
        <dt className="detail">Exchange:</dt>
        <dd className="detail-value">{exchange}</dd>
        <dt className="detail">Company:</dt>
        <dd className="detail-value">{name}</dd>
        <dt className="detail"># of Shares:</dt>
        <dd className="detail-value">{commaNumber(numberOfShares)}</dd>
        <dt className="detail">Price:</dt>
        <dd className="detail-value">{price}</dd>
        <dt className="detail">Status:</dt>
        <dd className="detail-value">{status}</dd>
        <dt className="detail">Total Shares&apos; Value:</dt>
        <dd className="detail-value">{commaNumber(totalSharesValue)}</dd>
      </dl>
    </details>
  );
};

IPODetails.propTypes = {
  IPO: PropTypes.shape({
    symbol: PropTypes.string,
    exchange: PropTypes.string,
    name: PropTypes.string,
    numberOfShares: PropTypes.number,
    price: PropTypes.string,
    status: PropTypes.string,
    totalSharesValue: PropTypes.number,
  }),
};

export default IPODetails;
