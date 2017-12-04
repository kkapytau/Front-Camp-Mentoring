let whatRemove = null;

module.exports = function({ types: t }) {
  return {
    visitor: {
      Program(path, state) {
        whatRemove = state.opts.removeNode;
      },
      MemberExpression(path, state) {
        if (path.node.object.name === whatRemove) {
          path.parentPath.parentPath.remove();
        }
      }
    }
  };
};
