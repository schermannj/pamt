const pamt = require('./service.pamt');

module.exports = pamt({
  getName: name => name.toUpperCase()
});
