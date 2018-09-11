const handle = require('./../../handle');

describe('test/integration/handle.test.js', () => {
  it('initializes without any hiccups', () => {
    expect(handle.defaultFunction).to.be.a('function');
  });
});

