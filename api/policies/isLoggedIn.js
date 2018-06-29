module.exports = async function (req, res, proceed) {
      
    if (req.session.authenticated) {
      return proceed();
    }
  
    return res.redirect('/login');
    
};