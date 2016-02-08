const ed = require('./dist/index.js');
const assert = require('assert');

describe('Test Gregorian to Ethiopian', function () {
  it('values should be equal', function () {
    assert.deepEqual([1975, 3, 12], ed.toEthiopian(1982, 11, 21));
    assert.deepEqual([2003, 4, 11], ed.toEthiopian(2010, 12, 20));
  });
});

describe('Test Ethiopian to Gregorian', function () {
  it('values should be equal', function () {
    assert.deepEqual([1982, 11, 21], ed.toGregorian(1975, 3, 12));
    assert.deepEqual([1941, 12, 7], ed.toGregorian(1934, 3, 28));
    assert.deepEqual([2010, 12, 22], ed.toGregorian(2003, 4, 130));
  });
});

describe('Test Ethiopian to Gregorian to Ethiopian', function () {
  it('values should be equal', function () {
    assert.deepEqual([1982, 11, 21], ed.toEthiopian(ed.toGregorian(1982, 11, 21)));
    assert.deepEqual([1941, 12, 7], ed.toEthiopian(ed.toGregorian(1941, 12, 7)));
    assert.deepEqual([2010, 12, 22], ed.toEthiopian(ed.toGregorian(2010, 12, 22)));
  });
});

describe('Test Gregorian to Ethiopian to Gregorian', function () {
  it('values should be equal', function () {
    assert.deepEqual([1982, 11, 21], ed.toGregorian(ed.toEthiopian(1982, 11, 21)));
    assert.deepEqual([1941, 12, 7], ed.toGregorian(ed.toEthiopian(1941, 12, 7)));
    assert.deepEqual([2010, 12, 22], ed.toGregorian(ed.toEthiopian(2010, 12, 22)));
  });
});
