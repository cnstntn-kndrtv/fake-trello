const btoa = require('btoa');

module.exports = {

    attributes: {

        // primitives

        encryptedPassword: {
            type: 'string',
        },

        email:  {
            type: 'string',
            unique: true,
            required: true,
        },

        // associations

        lists: {
            collection: 'list',
            via: 'owner',
        },

        tasks: {
            collection: 'task',
            via: 'owner',
        }

    },

    customToJSON: function(i) {
        // delete some fields
        return _.omit(this, ['encryptedPassword', 'email'])
    },

    beforeCreate: function (values, next) {
        // create encryptedPassword
        if (values.password) {
            values.encryptedPassword = btoa(values.password);
            delete values.password;
        }

        next();
    },

};