module.exports = function(config) {
  config.set({
    files: [
      "src/**/*.spec.js",
      {
        pattern: "src/**/*.js",
        mutated: true,
        included: false
      }
    ],
    testRunner: "jest",
    mutator: "javascript",
    coverageAnalysis: "off",
  });
};
