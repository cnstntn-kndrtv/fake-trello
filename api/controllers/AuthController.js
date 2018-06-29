/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const btoa = require('btoa');

module.exports = {

	login: function (req, res) {
        let email = req.param('email');
        let password = req.param('password');
        
        if (email && password) {
            User.findOne({email: email, encryptedPassword: btoa(password)}, (err, user) => {
                
                if (err) {
                    return res.status(500)
                            .send({
                                success: false,
                                err: err
                            })
                }

                if (!user) {
                    return res.status(401)
                            .send({
                                success: false,
                                msg: 'Неверный email и пароль!'
                            })
                    
                }

                // ok
                req.session.authenticated = true;
                req.session.user = user;
                res.cookie('loggedIn', true, {
                    expires: new Date(Date.now() + 900000),
                });

                res.status(200).send({success: true});

            });
        }

        else {
            return res.status(400)
                        .send({
                            success: false,
                            msg: 'Необходимо указать email и пароль!'
                        })
        }
    },

    
    logout: function (req, res) {
        delete req.session.User;
        req.session.authenticated = false;
        req.session.destroy();
        res.cookie('loggedIn', false);
        res.status(200).send({success: true});

    },


};