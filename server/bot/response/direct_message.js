/**
 * Created by thomas on 18/04/16.
 */

import { controller } from '../config';

controller.on('direct_message',function(bot, message) {
    Module.server.hello(bot, message);
});