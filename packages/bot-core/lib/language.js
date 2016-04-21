/**
 * Created by thomas on 21/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { slack, controller } from './config';
import { Team } from './collections/teams';
import { i18n } from 'meteor/anti:i18n';

controller.hears(['language', 'langue'], ['direct_mention','direct_message'], Meteor.bindEnvironment((bot, message) => {
    slack.api('auth.test', Meteor.bindEnvironment((err, auth) => {
        bot.startConversation(message, (err, convo) => {
            convo.ask(i18n('language.ask'), [
                {
                    pattern: /(fr|french|français)/i,
                    callback: Meteor.bindEnvironment((response, convo) => {
                        i18n.setLanguage('fr');
                        Team.update({team_id: auth.team_id}, {$set: {language: 'fr'}});
                        convo.say(i18n('language.response.change'));
                        convo.next();
                    })
                },
                {
                    pattern: /(en|english|anglais)/i,
                    callback: Meteor.bindEnvironment((response, convo) => {
                        i18n.setLanguage('en');
                        Team.update({team_id: auth.team_id}, {$set: {language: 'en'}});
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
}));