/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
    // Don't seed fake data when running in production.
    if (process.env.NODE_ENV === 'production') {
      return done();
    }
    
    // check if we already have fake data
    // if (await User.count() > 0) return done();
    if (await Board.count() > 0) return done();
    if (await List.count() > 0) return done();
    if (await Task.count() > 0) return done();
    
    await Board.createEach([
        { title: 'Board 1', id: 1 },
    ])
    
    await List.createEach([
        { title: 'List One', board: 1, id: 1 },
        { title: 'List Two', board: 1, id: 2 },
    ])
    
    await Task.createEach([
        { title: '0011', list: 1 },
        { title: '0012', list: 1 },
        { title: '0021', list: 2 },
    ])
    
    return done();

};
