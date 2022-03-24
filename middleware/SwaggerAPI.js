

module.exports = {
  register(fastify){
    fastify.register(require('fastify-swagger'), {
      routePrefix: '/swaggerDocumentation',
      swagger: {
        info: {
          title: 'Generic',
          description: 'Documentación',
          version: '1.0'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
      },
      exposeRoute: true
    });
  }
};
