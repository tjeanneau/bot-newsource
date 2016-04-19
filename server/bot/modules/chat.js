/**
 * Created by thomas on 19/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { slack, bot } from '../config';
import { HELLO } from '../library/chat';

var hello = (bot, message) => {
    let text = message.text.toLowerCase();
    for(let i = 0 ; i < HELLO.length ; i++){
        if(text.indexOf(HELLO[i]) > -1){
            slack.api('users.info', { user: message.user }, function(err, response){
                bot.reply(message, HELLO[i] + ' ' + response.user.name + ' !');
            });
        }
    }
};

Meteor.startup(() => {
    Module.server.hello = hello;
});
