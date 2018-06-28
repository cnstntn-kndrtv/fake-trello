/**
 * List.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        
        // primitives
        
        // name
        title: {
            type: 'string',
            required: true,
            maxLength: 100,
        },

        // order on board
        index: {
            type: 'number',
        },


        // associations
        
        // reference to Card model
        // many Cards in one List
        tasks: {
            collection: 'task',
            via: 'list',
        },
        
        // reference to Board model
        // many List in one Board
        board: {
            model: 'board',
        },
        
        // reference to User model
        // one User owns many Lists
        // owner: {
        //     model: 'user',
        // },
    },
    
    beforeCreate: function(values, cb) {
        if (!values.index) {
            sails.helpers.getListIndex(values.board)
                .exec((err, index) => {
                    if (err) return cb(err);
                    values.index = index;
                    return cb();
                })
        }
    }
};
