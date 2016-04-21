/**
 * Created by thomas on 18/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { i18n } from 'meteor/anti:i18n';
import { Team } from './collections/teams';
import Botkit from 'botkit';
import SlackNode from 'slack-node';

const token = Meteor.settings.SLACK_BOT_TOKEN;
let controller = Botkit.slackbot(),
    slack = new SlackNode(token),
    TEAM_ID = null;
let bot = controller.spawn({
    token: token
});

i18n.setDefaultLanguage('en');
bot.startRTM(function(err, bot, payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});
slack.api('auth.test', Meteor.bindEnvironment((err, response) => {
    TEAM_ID = response.team_id;
    if(!Team.findOne({team_id: TEAM_ID})){
        Team.insert({
            url: response.url,
            team: response.team,
            user: response.user,
            team_id: response.team_id,
            user_id: response.user_id
        });
    }else{
        i18n.setLanguage(Team.findOne({team_id: TEAM_ID}, {fields: { language: 1}}).language);
    }
}));

export { slack, controller, bot, TEAM_ID};