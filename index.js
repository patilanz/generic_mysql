const {processErrorManager} = require('./services/ErrorService');


const fastify = require('fastify')({
  logger: {
    prettyPrint: {
      translateTime: 'HH:MM:ss.l',
      ignore: 'pid,hostname',
      colorize: true
    }
  }
})

require('./middleware/SwaggerAPI').register(fastify);


// change in production
fastify.register(require('fastify-cors'), {
  origin: '*',
  methods: ['POST', 'DELETE', 'PUT', 'GET', 'OPTIONS']
});

fastify.register(require('fastify-jwt'), {
  secret: process.env.JWT_SECRET,
  /*  cookie: {
      cookieName: 'token',
      signed: true
    }*/
})
//fastify.register(require('fastify-cookie'));


require('./routes/index')(fastify);


fastify.get('/test', () => 'OK');

const start = async () => {

  fastify.listen(process.env.PORT, '0.0.0.0', function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  });
}


process.on('uncaughtException', processErrorManager(1, 'uncaughtException'));
process.on('unhandledRejection', processErrorManager(1, 'unhandledRejection'));
process.on('SIGTERM', processErrorManager(0, 'SIGTERM'));
process.on('SIGINT', processErrorManager(0, 'SIGINT'));

start();


