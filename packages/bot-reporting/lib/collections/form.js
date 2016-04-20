/**
 * Created by thomas on 19/04/16.
 */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Form = new Mongo.Collection('Form');

Form.schema = new SimpleSchema({
    number: {
        type: Number,
        optional: false,
        defaultValue: 0
    },
    response_1: {
        type: String,
        optional: false
    },
    response_2: {
        type: String,
        optional: true
    },
    response_3: {
        type: String,
        optional: true
    },
    response_4: {
        type: String,
        optional: true
    },
    response_5: {
        type: String,
        optional: true
    },
    response_6: {
        type: String,
        optional: true
    },
    response_7: {
        type: String,
        optional: true
    },
    response_8: {
        type: String,
        optional: true
    },
    response_9: {
        type: String,
        optional: true
    }
});

Meteor.startup(() => {
    Form.attachSchema(Form.schema);
});