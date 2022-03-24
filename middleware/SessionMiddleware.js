
const {errors} = require('../services/ErrorService');

module.exports = {
  async secured(request, reply){
    try{
      await request.jwtVerify();
    }catch(err){
      // maybe logs
      throw {error: errors.NotAuthorizedError};
    }
  }
}
