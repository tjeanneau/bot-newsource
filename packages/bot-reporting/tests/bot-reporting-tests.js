// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by lib.js.
import { name as packageName } from "meteor/bot-reporting";

// Write your tests here!
// Here is an example.
Tinytest.add('bot-reporting - example', function (test) {
  test.equal(packageName, "bot-reporting");
});
