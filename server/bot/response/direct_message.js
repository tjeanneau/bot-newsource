/**
 * Created by thomas on 18/04/16.
 */

import { controller } from '../config';
import { slack } from '../config';

controller.on('direct_message',function(bot, message) {
    slack.api('users.info', { user: message.user }, function(err, response){
        Module.server.hello(bot, message, response.user);
        Module.server.form(bot, message, response.user);
    });
});