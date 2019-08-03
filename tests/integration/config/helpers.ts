import * as mocha from 'mocha';
import * as chai from 'chai';
import * as td from 'testdouble';
const supertes = require('supertest');
import App from '../../../src/api/api';

const app = App;
const request = supertes;
const expect = chai.expect;
const testdouble = td;

export { app, request, expect, testdouble };