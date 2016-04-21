/**
 * Created by thomas on 18/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { slack, controller, TEAM_ID } from 'meteor/newsource:bot-core';
import { Report } from './collections/report';
import { i18n } from 'meteor/anti:i18n';

controller.hears(['report', 'rapport'], ['direct_mention','direct_message'], Meteor.bindEnvironment((bot, message) => {
    slack.api('users.info', { user: message.user }, Meteor.bindEnvironment((err, response) => {
        const number = Report.find({}).count() + 1;
        const reportId = Report.insert({
            number: number,
            team_id: TEAM_ID
        });
        let newProblem;
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
                    pattern: /^(yes|yea|yup|yep|ya|sure|ok|y|yeah|yah|oui|ouais|o)/i,
                    callback: (response, convo) => {
                        convo.say(i18n('addProblem.response.yes'));
                        newProblem = {};
                        problem(response, convo);
                        convo.next();
                    }
                },
                {
                    pattern: /^(no|nah|nope|n|non|nan)/i,
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
                newProblem.problem = response.text;
                solution(message, convo);
                convo.next();
            });
        };
        let solution = (message, convo) => {
            convo.ask(i18n('solution.ask'), (response, convo) => {
                convo.say(i18n('solution.response'));
                newProblem.solution = response.text;
                why(message, convo);
                convo.next();
            });
        };
        let why = (message, convo) => {
            convo.ask(i18n('why.ask'), (response, convo) => {
                convo.say(i18n('why.response'));
                newProblem.why = response.text;
                measure(message, convo);
                convo.next();
            });
        };
        let measure = (message, convo) => {
            convo.ask(i18n('measure.ask'), (response, convo) => {
                convo.say(i18n('measure.response'));
                newProblem.measure = response.text;
                proof(message, convo);
                convo.next();
            });
        };
        let proof = (message, convo) => {
            convo.ask(i18n('proof.ask'), (response, convo) => {
                convo.say(i18n('proof.response'));
                newProblem.proof = response.text;
                goal(message, convo);
                convo.next();
            });
        };
        let goal = (message, convo) => {
            convo.ask(i18n('goal.ask'), Meteor.bindEnvironment((response, convo) => {
                convo.say(i18n('goal.response'));
                newProblem.goal = response.text;
                Report.update({_id: reportId}, { $push: { problems: newProblem }});
                addProblem(message, convo);
                convo.next();
            }));
        };
        bot.startConversation(message, start);
    }));
}));