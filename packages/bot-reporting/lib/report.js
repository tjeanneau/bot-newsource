/**
 * Created by thomas on 18/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { slack, controller } from 'meteor/newsource:bot-core';
import { Report } from './collections/report';
import { i18n } from 'meteor/anti:i18n';

controller.hears(['report', 'rapport'], ['direct_mention','direct_message'], Meteor.bindEnvironment((bot, message) => {
    slack.api('users.info', { user: message.user }, Meteor.bindEnvironment((err, response) => {
        const number = Report.find({}).count();
        const reportId = Report.insert({
            number: number + 1
        });
        let start = (err, convo) => {
            convo.say(i18n('welcome') + response.user.name + '! :simple_smile:');
            learn(message, convo);
        };
        let learn = (message, convo) => {
            convo.ask(i18n('learn.ask'), Meteor.bindEnvironment((response, convo) => {
                convo.say(i18n('learn.response') + response.text);
                Report.update({_id: reportId}, { $set: { learn: response.text }});
                metrics(message, convo);
                convo.next();
            }));
        };
        let metrics = (message, convo) => {
            convo.ask(i18n('metrics.ask'), Meteor.bindEnvironment((response, convo) => {
                convo.say(i18n('metrics.response') + response.text);
                Report.update({_id: reportId}, { $set: { metrics: response.text }});
                feeling(message, convo);
                convo.next();
            }));
        };
        let feeling = (message, convo) => {
            convo.ask(i18n('feeling.ask'), Meteor.bindEnvironment((response, convo) => {
                convo.say(i18n('feeling.response') + response.text);
                Report.update({_id: reportId}, { $set: { feeling: response.text }});
                addProblem(message, convo);
                convo.next();
            }));
        };
        let addProblem = (message, convo) => {
            convo.ask(i18n('addProblem.ask'), [
                {
                    pattern: bot.utterances.yes,
                    callback: (response, convo) => {
                        convo.say(i18n('addProblem.response.yes'));
                        problem(response, convo);
                        convo.next();
                    }
                },
                {
                    pattern: bot.utterances.no,
                    callback: (response, convo) => {
                        convo.say(i18n('addProblem.response.no'));
                        convo.next();
                    }
                },
                {
                    default: true,
                    callback: (response, convo) => {
                        convo.repeat();
                        convo.next();
                    }
                }
            ]);
        };
        let problem = (message, convo) => {
            convo.ask(i18n('problem.ask'), (response, convo) => {
                convo.say(i18n('problem.response'));
                solution(message, convo);
                convo.next();
            });
        };
        let solution = (message, convo) => {
            convo.ask(i18n('solution.ask'), (response, convo) => {
                convo.say(i18n('solution.response'));
                why(message, convo);
                convo.next();
            });
        };
        let why = (message, convo) => {
            convo.ask(i18n('why.ask'), (response, convo) => {
                convo.say(i18n('why.response'));
                measure(message, convo);
                convo.next();
            });
        };
        let measure = (message, convo) => {
            convo.ask(i18n('measure.ask'), (response, convo) => {
                convo.say(i18n('measure.response'));
                proof(message, convo);
                convo.next();
            });
        };
        let proof = (message, convo) => {
            convo.ask(i18n('proof.ask'), (response, convo) => {
                convo.say(i18n('proof.response'));
                goal(message, convo);
                convo.next();
            });
        };
        let goal = (message, convo) => {
            convo.ask(i18n('goal.ask'), (response, convo) => {
                convo.say(i18n('goal.response'));
                addProblem(message, convo);
                convo.next();
            });
        };
        bot.startConversation(message, start);
    }));
}));