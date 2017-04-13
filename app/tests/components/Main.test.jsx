var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
import TestUtils from 'react-dom/test-utils';

var Main = require('../../components/Main.jsx');

describe('Main', () => {
  it('Main should exist', () => {
    expect(Main).toExist();
  });
});
