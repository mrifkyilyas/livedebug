const jwt = require('jsonwebtoken');

module.exports = {
  sign: function(user) {
    console.log('jwt sign')
    return jwt.sign(user, process.env.JWT_SECRET);
  },
  verify: function(token) {
    console.log('jwt verifiy')
    console.log(token)
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
