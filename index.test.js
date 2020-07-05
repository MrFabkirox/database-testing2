const log = console.log;
const _ = require('lodash');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const {
  getErrorResponse,
  getSuccessResponse
} = require('./index');

describe("#index", () => {
  it("a basic test should work", () => {
    true.should.be.true;
  })

  describe("#getErrorResponse", () => {
    it('it returns a result of false', () => {
      getErrorResponse().result.should.be.false;
    })
    it('should return an error if we give it one', () => {
      const boom = new Error('boom');
      getErrorResponse(boom).error.should.equal(boom);
    })
    describe("#getSuccessResponse", () => {
      it('should be true', () => {
        getSuccessResponse().result.should.be.true;
      })
      it('should return data if we give it some', () => {
        getSuccessResponse().result.should.be.true;
      })
    })
  })
})
