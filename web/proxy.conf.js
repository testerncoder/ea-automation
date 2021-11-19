const PROXY_CONFIG = {
  '/api/*': {
    'target': `https://eacp.energyaustralia.com.au/codingtest/`,
    'secure': true,
    'changeOrigin': true,
    'logLevel': 'debug'
  },
};

module.exports = PROXY_CONFIG;
