/**
 * Created by thomas on 19/04/16.
 */

import { Meteor } from 'meteor/meteor';

let _question_1 = (bot, message, callback) => {
    bot.reply(message, 'What did you learn about your startup/business during the last week?', (err, response) => {
        callback();
    })
};

let _question_2 = (bot, message) => {
    bot.reply(message, 'Thanks for your answer !');
};

let form = (bot, message, user) => {
    let text = message.text.toLowerCase();
    if(text.indexOf('form') > -1){
        bot.reply(message, 'Let\'s recap what happened last week in your startup ' + user.name + '! :simple_smile:');
        _question_1(bot, message, () => {
            _question_2(bot, message);
        });
    }
};

Meteor.startup(() => {
    Module.server.form = form;
});