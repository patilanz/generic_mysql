const Promise = require('bluebird');
const crypto = Promise.promisifyAll(require('crypto'));



module.exports = {
  async generateRandomInt(maxLength) {
    let buf = await crypto.randomBytes(7).toString('hex');
    return parseInt(buf, 16) % maxLength;
  },
  async hashPassword(args) {
    const {
      pw,
      salt = await crypto.randomBytes(26).toString('hex'),
      iter = await this.generateRandomInt(1024) + 10000
    } = args;
    let hash = (await crypto.pbkdf2Async(pw, salt, iter, 64, 'sha512')).toString('hex');
    return `${hash}:${salt}:${iter}`;
  },
  async checkHash(pw, hash) {
    if(!hash || !pw)return false;
    let [, salt, iter] = hash.split(':');
    iter *= 1;

    return (crypto.timingSafeEqual(
      Buffer.from(hash, 'utf8'),
      Buffer.from((await module.exports.hashPassword({pw, salt, iter})))
    ));
  },
}
