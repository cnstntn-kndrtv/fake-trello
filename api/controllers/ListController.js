/**
 * ListController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // export const addList = (title) => {
    //     return {
    //         type: ActionTypes.ADD_LIST,
    //         payload: title
    //     };
    // }
    
    addStatus: function (req, res) {
        
            var data = {
                title       : req.param('title'),
                name        : req.param('name'),
                description : req.param('description'),
            }
        
            Status.create(data).exec(function (err, status) {
                                                
                if (err) return res.send(500);
            
                res.redirect('/status/');
            
            });
        }

};

