/**
 * Card.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        // primitives

        title: {
            type: 'string',
            required: true,
            maxLength: 100,
        },

        index: {
            type: 'number',
        },

        // associations

        // reference to List model
        list: {
            model: 'list',
            required: true,
        },

        // reference to User model
        // one User owns many Cards
        // owner: {
        //     model: 'user',
        // },

    },

    beforeCreate: function (values, cb) {
        if (!values.index) {
            sails.helpers.getTaskIndex(values.list)
                .exec((err, index) => {
                    if (err) return cb(err);
                    values.index = index;
                    return cb();
                })
        }
    },

};
