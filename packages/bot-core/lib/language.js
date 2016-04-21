/**
 * Created by thomas on 21/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { controller, TEAM_ID } from './config';
import { Team } from './collections/teams';
import { i18n } from 'meteor/anti:i18n';

controller.hears(['language', 'langue'], ['direct_mention','direct_message'], Meteor.bindEnvironment((bot, message) => {
    bot.startConversation(message, (err, convo) => {
        convo.ask(i18n('language.ask'), [
            {
                pattern: /(en|english|anglais)/i,
                callback: Meteor.bindEnvironment((response, convo) => {
                    i18n.setLanguage('en');
                    Team.update({team_id: TEAM_ID}, { $set: { language: 'en'}});
                    convo.say(i18n('language.response.change'));
                    convo.next();
                })
            },
            {
                pattern: /(fr|french|français)/i,
                callback: Meteor.bindEnvironment((response, convo) => {
                    i18n.setLanguage('fr');
                    Team.update({team_id: TEAM_ID}, { $set: { language: 'fr'}});
                    convo.say(i18n('language.response.change'));
                    convo.next();
                })
            },
            {
                default: true,
                callback: (response, convo) => {
                    convo.say(i18n('language.response.default'));
                    convo.repeat();
                    convo.next();
                }
            }
        ]);
    })
}));