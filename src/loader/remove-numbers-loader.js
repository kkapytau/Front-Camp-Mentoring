function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function(source) {
  if (this.cacheable) this.cacheable();

  let jsonObj = typeof source === "string" ? JSON.parse(source) : source;

  Object.keys(jsonObj).forEach(function(key) {
    if(isNumeric(key)){
      delete jsonObj[key];
    }
  });

  jsonObj = JSON.stringify(jsonObj)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');

  return `module.exports = ${jsonObj}`;
};
