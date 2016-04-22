// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by bot-email.js.
import { name as packageName } from "meteor/bot-email";

// Write your tests here!
// Here is an example.
Tinytest.add('bot-email - example', function (test) {
  test.equal(packageName, "bot-email");
});
