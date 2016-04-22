/**
 * Created by thomas on 22/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

Meteor.startup(() => {
    Meteor.Mailgun.config({
        username: 'postmaster@newsource.io',
        password: '428e7d46343572b2ed1326cb926d7fc7'
    });
});

Meteor.methods({
    sendEmail: function (mailFields) {
        check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);
        this.unblock();
        Meteor.Mailgun.send({
            to: mailFields.to,
            from: mailFields.from,
            subject: mailFields.subject,
            text: mailFields.text,
            html: mailFields.html
        });
    }
});