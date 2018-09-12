const stage = process.env.STAGE;

const createTask = ({ get, scan }) => {
  // Proxyquire assigned to global in _setup.test.js so working directory is `test/`
  return proxyquire('./../src/tasks/get<%= Singular %>Task', {
    'aws-sdk': {
      DynamoDB: {
        DocumentClient: function () {
          this.get = get;
          this.scan = scan;
        },
      },
    },
  });
};

describe('test/unit/tasks/get<%= Singular %>Task.test.js', () => {
  it(`if uuid is supplied it gets item with that uuid from ${stage}-<%= plural %> table and does not scan`, async () => {
    const scan = sinon.stub().yields(null, {});
    const get = sinon.stub().yields(null, {});

    const event = {
      uuid: '1',
    };

    const get<%= Singular %>Task = createTask({ scan, get });

    await get<%= Singular %>Task(event);

    expect(scan.called).to.be.false;
    expect(get.called).to.be.true;
    expect(get.firstCall.args[0].TableName).to.eq(`${stage}-<%= plural %>`);
    expect(get.firstCall.args[0].Key.uuid).to.eq(event.uuid);
  });

  it(`if no uuid is supplied it scans ${stage}-<%= plural %> table and does not get`, async () => {
    const scan = sinon.stub().yields(null, {});
    const get = sinon.stub().yields(null, {});

    const event = {};

    const get<%= Singular %>Task = createTask({ scan, get });

    await get<%= Singular %>Task(event);

    expect(scan.called).to.be.true;
    expect(scan.firstCall.args[0].TableName).to.eq(`${stage}-<%= plural %>`);
    expect(get.called).to.be.false;
  });
});

