'use strict';

const { Random, MersenneTwister19937 } = require('random-js');
const random = new Random(MersenneTwister19937.autoSeed());

module.exports = {
  element: function element(e) {
    return random.pick(e);
  },
  shuffle: function shuffle(m) {
    return random.shuffle(m);
  },
  integer: function integer(min, max) {
    return random.integer(min, max);
  },
  chance: function chance(c) {
    return random.bool(c);
  }
};