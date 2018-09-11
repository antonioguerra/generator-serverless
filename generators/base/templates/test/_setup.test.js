const expect = require('chai').expect;
const proxyquire = require('proxyquire');
const sinon = require('sinon');

require('dotenv').config();

global.expect = expect;
global.proxyquire = proxyquire;
global.sinon = sinon;

