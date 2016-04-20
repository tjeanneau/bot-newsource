// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by lib.js.
import { name as packageName } from "meteor/bot-core";

// Write your tests here!
// Here is an example.
Tinytest.add('bot-core - example', function (test) {
  test.equal(packageName, "bot-core");
});
