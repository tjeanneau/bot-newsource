Package.describe({
  name: 'newsource:bot-reporting',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use([
    'ecmascript',
    'aldeed:simple-schema@1.5.3',
    'aldeed:collection2@2.9.1',
    'newsource:bot-core@0.0.1',
    'anti:i18n@0.4.3'
  ]);
  api.mainModule('lib.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('newsource:bot-reporting');
  api.mainModule('bot-reporting-tests.js');
});
