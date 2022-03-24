

module.exports = securedInstance => {
  securedInstance.get('/drive', {schema: {tags: ['driver']}}, (request, reply) => {
    return {email: request.user.email};
  });
}
