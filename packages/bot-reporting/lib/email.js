/**
 * Created by thomas on 22/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { SSR } from 'meteor/meteorhacks:ssr';
import { Report } from './collection';

Meteor.methods({
    sendReport: (user, reportId) => {
        const report = Report.findOne({_id: reportId}, {fields: { number: 0, team_id: 0}});
        Meteor.call('sendEmail', {
            to: user.profile.email,
            from: 'welcome@newsource.fr',
            subject: 'Surprise ! This is your report !',
            text: 'This is what you\'re just report.',
            html: SSR.render('emailReport', {
                username: user.name,
                learn: report.learn,
                metrics: report.metrics,
                feeling: report.feeling,
                problems: report.problems
            })
        });
    }
});

SSR.compileTemplate('emailReport', Assets.getText('lib/template.html'));
