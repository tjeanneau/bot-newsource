/**
 * Created by thomas on 19/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { HELLO, WHOAREYOU, R_WHOAREYOU } from '../library/chat';

let hello = (bot, message, user) => {
    let text = message.text.toLowerCase(), i;
    for(i = 0 ; i < HELLO.length ; i++){
        if(text.indexOf(HELLO[i]) > -1){
            bot.reply(message, 'Bonjour ' + user.name + ' !');
        }
    }
    for(i = 0 ; i < WHOAREYOU.length ; i++){
        if(text.indexOf(WHOAREYOU[i]) > -1){
            bot.reply(message, Random.choice(R_WHOAREYOU));
        }
    }
};

Meteor.startup(() => {
    Module.server.hello = hello;
});
