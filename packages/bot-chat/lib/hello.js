/**
 * Created by thomas on 18/04/16.
 */

import { i18n } from 'meteor/anti:i18n';
import { slack, controller } from 'meteor/newsource:bot-core';
import { HELLO } from './vocabulary/chat';

controller.hears(HELLO, ['direct_mention','direct_message'], (bot, message) => {
    slack.api('users.info', { user: message.user }, (err, response) =>{
        bot.reply(message, i18n('hello', response.user.name));
    });
});