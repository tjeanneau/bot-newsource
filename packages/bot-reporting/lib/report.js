/**
 * Created by thomas on 18/04/16.
 */

import { slack, controller } from 'meteor/newsource:bot-core';

controller.hears('report', ['direct_mention','direct_message'], function(bot, message) {
    slack.api('users.info', { user: message.user }, function(err, response){
        let start = (err, convo) => {
            convo.say('Let\'s recap what happened last week in your startup ' + response.user.name + '! :simple_smile:');
            learn(message, convo);
        };
        let learn = (message, convo) => {
            convo.ask('What did you learn about your startup/business during the last week?', (response, convo) => {
                convo.say('Thanks for your answer ! So you have learn: ' + response.text);
                metrics(message, convo);
                convo.next();
            });
        };
        let metrics = (message, convo) => {
            convo.ask('List key metrics you’re tracking, where they’re at, and compare with last few weeks?', (response, convo) => {
                convo.say('Thanks for your answer ! So you\'re metrics are: ' + response.text);
                feeling(message, convo);
                convo.next();
            });
        };
        let feeling = (message, convo) => {
            convo.ask('Overall, how is your startup feeling?', (response, convo) => {
                convo.say('Thanks for your answer ! So you feel: ' + response.text);
                addProblem(message, convo);
                convo.next();
            });
        };
        let addProblem = (message, convo) => {
            convo.ask('Do you want to report a problem?', [
                {
                    pattern: bot.utterances.yes,
                    callback: (response, convo) => {
                        convo.say('Great! I will continue...');
                        problem(response, convo);
                        convo.next();
                    }
                },
                {
                    pattern: bot.utterances.no,
                    callback: (response, convo) => {
                        convo.say('Perhaps later.');
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
            convo.ask('What is your top problem/question of the week?', (response, convo) => {
                convo.say('Thanks for your answer !');
                solution(message, convo);
                convo.next();
            });
        };
        let solution = (message, convo) => {
            convo.ask('How will your try to solve it this week?', (response, convo) => {
                convo.say('Thanks for your answer !');
                why(message, convo);
                convo.next();
            });
        };
        let why = (message, convo) => {
            convo.ask('For each solution, why do you think it\'ll work?', (response, convo) => {
                convo.say('Thanks for your answer !');
                measure(message, convo);
                convo.next();
            });
        };
        let measure = (message, convo) => {
            convo.ask('List metrics you’ll use to measure whether or not the solutions are doing what you expected (solving the problem)', (response, convo) => {
                convo.say('Thanks for your answer !');
                proof(message, convo);
                convo.next();
            });
        };
        let proof = (message, convo) => {
            convo.ask('List proof (qualitative) you’ll use as well:', (response, convo) => {
                convo.say('Thanks for your answer !');
                goal(message, convo);
                convo.next();
            });
        };
        let goal = (message, convo) => {
            convo.ask('Define goals for each metrics', (response, convo) => {
                convo.say('Thanks for your answer !');
                addProblem(message, convo);
                convo.next();
            });
        };
        bot.startConversation(message, start);
    });
});