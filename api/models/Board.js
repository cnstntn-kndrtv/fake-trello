/**
 * Board.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        
        // primitives
        
        // board title
        title: {
            type: 'string',
            required: true,
            maxLength: 100,
        },


        // associations
        
        // reference to List model
        // many Lists on one Board
        lists: {
            collection: 'list',
            via: 'board',
        },
        
        // reference to User model
        // one User owns many Bords
        // owner: {
        //     model: 'user',
        // },

    },

};
