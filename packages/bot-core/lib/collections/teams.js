/**
 * Created by thomas on 21/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

let Team = new Mongo.Collection('team');

Team.report = new SimpleSchema({
    recurrence: {
        type: String,
        allowedValues: ['week', 'month'],
        optional: false
    },
    startingDay: {
        type: String,
        allowedValues: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        optional: false
    },
    hour: {
        type: String,
        optional: false
    }
});

Team.schema = new SimpleSchema({
    url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: false
    },
    team: {
        type: String,
        optional: false
    },
    user: {
        type: String,
        optional: false
    },
    team_id: {
        type: String,
        optional: false
    },
    user_id: {
        type: String,
        optional: false
    },
    language: {
        type: String,
        optional: false,
        defaultValue: 'en'
    },
    report: {
        type: [Team.report],
        optional: true
    }
});

Meteor.startup(() => {
    Team.attachSchema(Team.schema);
});

export { Team };