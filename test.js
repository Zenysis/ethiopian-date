/* eslint-disable func-names, prefer-arrow-callback */

const ed = require('./dist/index.js');
const assert = require('assert');
const { describe, it } = require('global-mocha');

describe('Test Gregorian to Ethiopian', function () {
  it('values should be equal', function () {
    assert.deepEqual([1975, 3, 12], ed.toEthiopian(1982, 11, 21));
  });

  it('values should be equal', function () {
    assert.deepEqual([2003, 4, 11], ed.toEthiopian(2010, 12, 20));
  });
});

describe('Test Ethiopian to Gregorian', function () {
  it('values should be equal', function () {
    assert.deepEqual([1982, 11, 21], ed.toGregorian(1975, 3, 12));
  });

  it('values should be equal', function () {
    assert.deepEqual([1941, 12, 7], ed.toGregorian(1934, 3, 28));
  });

  it('values should be equal', function () {
    assert.deepEqual([2010, 12, 22], ed.toGregorian(2003, 4, 130));
  });
});

describe('Test Ethiopian to Gregorian to Ethiopian', function () {
  it('values should be equal', function () {
    assert.deepEqual([1982, 11, 21], ed.toEthiopian(ed.toGregorian(1982, 11, 21)));
  });

  it('values should be equal', function () {
    assert.deepEqual([1941, 12, 7], ed.toEthiopian(ed.toGregorian(1941, 12, 7)));
  });

  it('values should be equal', function () {
    assert.deepEqual([2010, 12, 22], ed.toEthiopian(ed.toGregorian(2010, 12, 22)));
  });
});

describe('Test Gregorian to Ethiopian to Gregorian', function () {
  it('values should be equal', function () {
    assert.deepEqual([1982, 11, 21], ed.toGregorian(ed.toEthiopian(1982, 11, 21)));
  });

  it('values should be equal', function () {
    assert.deepEqual([1941, 12, 7], ed.toGregorian(ed.toEthiopian(1941, 12, 7)));
  });

  it('values should be equal', function () {
    assert.deepEqual([2010, 12, 22], ed.toGregorian(ed.toEthiopian(2010, 12, 22)));
  });
});
