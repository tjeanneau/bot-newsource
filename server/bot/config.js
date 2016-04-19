/**
 * Created by thomas on 18/04/16.
 */

import { Meteor } from 'meteor/meteor';
import Botkit from 'botkit';
import Slack from 'slack-node';

let slack = new Slack(Meteor.settings.SLACK_BOT_TOKEN);
let controller = Botkit.slackbot();
let bot = controller.spawn({
        token: Meteor.settings.SLACK_BOT_TOKEN
});

bot.startRTM(function(err, bot, payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});

export { slack, controller, bot };