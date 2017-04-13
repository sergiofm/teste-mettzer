var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
import TestUtils from 'react-dom/test-utils';

var Capa = require('../../components/Capa.jsx');

describe('Capa', () => {
  it('Capa should exist', () => {
    expect(Capa).toExist();
  });
});
