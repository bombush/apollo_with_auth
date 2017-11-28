'use strict';

const path = require('path');

// A custom Jest transformer for loading .graphql files as string

module.exports = {
  process(src, filename) {
    return `module.exports = \`${src}\``
  },
};
