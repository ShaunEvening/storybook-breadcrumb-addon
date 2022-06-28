const { declare } = require('@babel/helper-plugin-utils');
const { types: t } = require('@babel/core');
const nodePath = require('path');

const pluckOptions = (state) => state.opts;

const removeProjectRoot = (root, path) => path.replace(root, '');

const getStoryParameters = (declarationPath) => declarationPath.properties.find(node =>
    node.key && node.key.name === 'parameters'
  );

const getBreadcrumbParameter = parameters =>
  parameters.properties.find(node => node.key && node.key.name === 'breadcrumb');

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: 'babel-plugin-add-storybook-breadcrumb',
    visitor: {
      ExportDefaultDeclaration: (path, state) => {
        if (state.handled) {
            return;
        }

        if (path.node.declaration.type === 'ObjectExpression') {
          const params = getStoryParameters(path.node.declaration);
          state.storyDeclarationPath = path;
          
          if(params) {
            state.storyParametersPath = params.value;

            const breadcrumb = getBreadcrumbParameter(params.value);

            if(breadcrumb) {
              state.breadcrumb = breadcrumb.value.value;
            }
          }
        }
      },
      Program: {
        exit: (_, state) => {
          if(!state.breadcrumb) {
            return;
          }

          state.handled = true;

          const { defaultBranch, githubUrl, projectRoot } = pluckOptions(state);
          const { filename } = state;

          const componentPath = removeProjectRoot(projectRoot, nodePath.resolve(nodePath.dirname(filename), state.breadcrumb));

          const componentUrl = `${githubUrl}/blob/${defaultBranch}${componentPath}`

          state.storyParametersPath.properties = state.storyParametersPath.properties.filter(node => node.key && node.key.name !== 'breadcrumb');

          state.storyParametersPath.properties.push(t.objectProperty(t.identifier('breadcrumb'), t.stringLiteral(componentPath)))
          state.storyParametersPath.properties.push(t.objectProperty(t.identifier('githubComponentUrl'), t.stringLiteral(componentUrl)))
        }
      },
    }
  };
});