/**
 * Created by thomas on 18/04/16.
 */

import { Meteor } from 'meteor/meteor';
import Botkit from 'botkit';

let controller = Botkit.slackbot();

let bot = controller.spawn({
        token: Meteor.settings.SLACK_BOT_TOKEN
});

bot.startRTM(function(err, bot, payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});

controller.hears('Je t\'aime !',['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,'Moi je t\'aime encore plus ! <3');
});