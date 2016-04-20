/**
 * Created by thomas on 18/04/16.
 */

import { slack, controller } from 'meteor/newsource:bot-core';

controller.on('direct_message',function(bot, message) {
    slack.api('users.info', { user: message.user }, function(err, response){
        Module.server.form(bot, message, response.user);
    });
});