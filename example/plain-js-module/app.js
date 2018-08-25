const service = require('./service');

console.log(service.getName('jim'));

try {
  service.getName(-84);
} catch (e) {
  console.error(e, 'plain-js-module pamt error');
}
