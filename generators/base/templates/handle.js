const {
  responseDefault,
  responseError,
  responseOptions,
  responseSuccess,
} = require('./src/helpers/responseHelpers');

// Functions
const createDefaultFunction = require('./src/functions/createDefaultFunction');

// Tasks
const deleteDefaultTask = require('./src/tasks/deleteDefaultTask');
const getDefaultTask = require('./src/tasks/getDefaultTask');
const upsertDefaultTask = require('./src/tasks/upsertDefaultTask');

module.exports = {
  defaultFunction: createDefaultFunction({
    deleteDefaultTask,
    getDefaultTask,
    responseDefault,
    responseError,
    responseOptions,
    responseSuccess,
    upsertDefaultTask,
  }),
};

