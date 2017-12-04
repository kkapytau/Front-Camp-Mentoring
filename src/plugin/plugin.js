module.exports = function({ types: t }) {
  return {
    visitor: {
      MemberExpression(path) {
        if (path.node.object.name === "console") {
          path.parentPath.parentPath.remove();
        }
      }
    }
  };
};
