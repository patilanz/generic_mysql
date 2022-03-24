const sessionMiddleware = require('../../middleware/SessionMiddleware');

module.exports = instance => {
  instance.register((securedInstance, opts, done) => {
    securedInstance.addHook('preHandler', sessionMiddleware.secured);



    done();
  });
}
