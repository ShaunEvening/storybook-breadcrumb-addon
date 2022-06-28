const path = require('path');

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    {
      name: "../preset.js",
      options: {
        breadcrumbs: {
          repositoryRoot: path.resolve(__dirname, "../"),
          defaultBranch: 'main',
          githubUrl: 'https://github.com/ShaunLloyd/breadcrumb-addon',
        },
      },
    },
    "@storybook/addon-essentials"],
};
