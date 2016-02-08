const ethiopianDate = require('./index.js');
const assert = require('assert');

describe('Test Ethiopian to Gregorian', function() {
  it('values should be equal', function () {
    assert.deepEqual([1982, 11, 21], ethiopianDate.toGregorian(1975,03,12));
    assert.deepEqual([1941, 12, 07], ethiopianDate.toGregorian(1934,03,28));
    assert.deepEqual([2010, 12, 22], ethiopianDate.toGregorian(2003,04,130));
  });
});

describe('Test Gregorian to Ethiopian', function() {
  it('values should be equal', function () {
    assert.deepEqual([1975,03,12], ethiopianDate.toEthiopian(1982, 11, 21));
    assert.deepEqual([2003, 4, 11], ethiopianDate.toEthiopian(2010,12,20));
  });
});
