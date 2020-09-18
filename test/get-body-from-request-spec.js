const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();
  });

  it('returns an empty string for no body', done => {
    // Arrange
    const expected = '';
    // Act
    const result = getBodyFromRequest(fakeReq);
    fakeReq.emit('end');
    // Assert
    result
      .then((body) => {
        // console.log(body);
        if (body === '') {
          done();
        } else {
          done(`Failed. Got ${body}`);
        }
      })

  });

  it('returns the data read from the stream', done => {
    // Arrange
    const bodyPromise = getBodyFromRequest(fakeReq);
    const data1 = 'this another test';
    const data2 = 'this the last test';

    // Act
    fakeReq.emit('data', data1);
    fakeReq.emit('data', data2);
    fakeReq.emit('end');

    // Assert
    bodyPromise
      .then((body) => {
        if (body === data1 + data2) {
          done();
        } else {
          done(`Failed. Got ${body}`);
        }
      })
  });
});
