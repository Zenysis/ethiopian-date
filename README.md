Ethiopian Date Converter
========================

[![Build Status](https://travis-ci.org/Zenysis/ethiopian-date.svg?branch=master)](https://travis-ci.org/Zenysis/ethiopian-date)

Introduction
------------

ethiopian-date is a date converter from Ethiopian calendar to Gregorian
calendar and vice-versa.
It is a port from [@rgaudin](https://github.com/rgaudin)'s [ethiopian_date](https://github.com/rgaudin/tools/tree/master/ethiopian_date) python module.

## Installation

`npm install` this package:

```bash
$ npm install ethiopian-date --save
```

## Usage

Include it in your project:

```js
var ethiopianDate = require('ethiopian-date');
```
ethiopian-date currently supports two function calls.

- To convert Gregorian dates to Ethiopian, call:
```js
ethiopianDate.toEthiopian(YYYY, MM, DD)
```
with return type array [YYYY, MM, DD]

- To convert Ethiopian dates to Gregorian, call:
```js
ethiopianDate.toGregorian(YYYY, MM, DD)
```
with return type array [YYYY, MM, DD]


Resources
---------

 * http://www.funaba.org/en/calendar-conversion.cgi
 * http://www.senamirmir.org/projects/
