

module.exports = fastify => {

  fastify.register((instance, opts, done) => {
    require('./auth')(instance);
    require('./client')(instance);
    require('./driver')(instance);


    done();
  }, {prefix: '/api'});
}
