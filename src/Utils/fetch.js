import nodeFetch from 'node-fetch';

const fetch = async (url, options = {}, token = '') => {
  // options.headers = options.headers || {};
  // options.headers['X-Finnhub-Token'] =
  const apiToken =
    // For custom token
    token ||
    // For React
    process.env.FINNHUB_API_KEY_1 ||
    process.env.FINNHUB_API_KEY_2 ||
    // For Jest
    process.env.REACT_APP_FINNHUB_API_KEY_1 ||
    process.env.REACT_APP_FINNHUB_API_KEY_2;
  options.json = true;
  if (url.indexOf('?') === -1) {
    url += `?token=${apiToken}`;
  }
  else {
    url += `&token=${apiToken}`;
  }
  const response = await nodeFetch(url, options);
  const json = await response.json();
  return json;
};

export default fetch;
