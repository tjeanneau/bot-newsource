/**
 * Created by thomas on 19/04/16.
 */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

let Report = new Mongo.Collection('report');

Report.problem = new SimpleSchema({
    problem: {
        type: String,
        optional: true
    },
    solution: {
        type: String,
        optional: true
    },
    why: {
        type: String,
        optional: true
    },
    measure: {
        type: String,
        optional: true
    },
    proof: {
        type: String,
        optional: true
    },
    goal: {
        type: String,
        optional: true
    }
});

Report.schema = new SimpleSchema({
    number: {
        type: Number,
        optional: false,
        defaultValue: 0
    },
    team_id: {
        type: String,
        optional: true
    },
    learn: {
        type: String,
        optional: true
    },
    metrics: {
        type: String,
        optional: true
    },
    feeling: {
        type: String,
        optional: true
    },
    problems: {
        type: [Report.problem],
        optional: true
    }
});

Meteor.startup(() => {
    Report.attachSchema(Report.schema);
});

export { Report };