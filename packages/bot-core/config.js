/**
 * Created by thomas on 18/04/16.
 */

import { Meteor } from 'meteor/meteor';
import Botkit from 'botkit';
import SlackNode from 'slack-node';

const token = Meteor.settings.SLACK_BOT_TOKEN;

let controller = Botkit.slackbot();
let slack = new SlackNode(token);
let bot = controller.spawn({
        token: token
});

bot.startRTM(function(err, bot, payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});

export { slack, controller, bot, };