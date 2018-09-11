const Generator = require('yeoman-generator');
const { EOL } = require('os');

module.exports = class extends Generator {
  writing() {
    const pkgConfig = require(this.destinationPath('package.json'));

    pkgConfig.scripts = pkgConfig.scripts || {};

    pkgConfig.scripts['lint'] = 'eslint src/**/**.js test/**/**.js --quiet';
    pkgConfig.scripts['lint:fix'] = 'eslint src/**/**.js test/**/**.js --fix --quiet';
    pkgConfig.scripts['test'] = 'nyc mocha';
    pkgConfig.scripts['test:ci'] = 'nyc mocha -R mocha-junit-reporter && nyc report';
    pkgConfig.scripts['test:functional'] = 'nyc mocha test/functional';
    pkgConfig.scripts['test:integration'] = 'nyc mocha test/integration';
    pkgConfig.scripts['test:regression'] = 'nyc mocha test/regression';
    pkgConfig.scripts['test:unit'] = 'nyc mocha test/unit';

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      pkgConfig
    );

    const fileTemplates = [
      '_editorconfig',
      '_env',
      '_eslintignore',
      '_eslintrc',
      '_npmrc',
      '_nvmrc',
      '_nycrc',
      'handle.js',
      'serverless.yml',
      'src/functions/createDefaultFunction.js',
      'src/helpers/responseHelpers.js',
      'src/tasks/deleteDefaultTask.js',
      'src/tasks/getDefaultTask.js',
      'src/tasks/upsertDefaultTask.js',
      'test/_setup.test.js',
      'test/integration/handle.test.js',
      'test/mocha.opts',
      'test/unit/functions/createDefaultFunction.test.js',
      'test/unit/helpers/responseHelpers.test.js',
      'test/unit/tasks/deleteDefaultTask.test.js',
      'test/unit/tasks/getDefaultTask.test.js',
      'test/unit/tasks/upsertDefaultTask.test.js',
    ];

    this.fs.append(
      this.destinationPath('.gitignore'),
      `coverage${EOL}.nyc_output${EOL}*.log${EOL}`
    );

    fileTemplates.forEach((filename) => {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(filename.replace(/^_/, '.')),
        {
          name: pkgConfig.name,
        }
      );
    });
  }

  install() {
    this.npmInstall([
      'chai',
      'dotenv',
      'eslint',
      'mocha',
      'mocha-junit-reporter',
      'nyc',
      'proxyquire',
      'sinon',
    ], { 'save-dev': true });

    this.npmInstall([
      'axios',
      'aws-sdk',
      'uuid',
    ]);
  }
};

