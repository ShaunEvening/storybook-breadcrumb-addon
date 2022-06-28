function babelDefault(config, { breadcrumbs }) {
  if (!breadcrumbs.repositoryRoot) {
    throw new Error('[STORYBOOK BREADBCRUMBS]: A project root is required')
  }

  if (!breadcrumbs.githubUrl) {
    throw new Error('[STORYBOOK BREADBCRUMBS]: Your github url is required')
  }

  return {
    ...config,
      overrides: [{ 
        include: /\.stories\.(j|t)sx?$/, 
        plugins: [
          ...config.plugins,
          [require.resolve('./breadcrumb-plugin.js'), { projectRoot: breadcrumbs.repositoryRoot, githubUrl: breadcrumbs.githubUrl, defaultBranch: breadcrumbs.defaultBranch || 'main' }],
        ]
    }]
  };
}

function managerEntries(entry = []) {
  return [...entry, require.resolve("./dist/esm/preset/manager")];
}

module.exports = {
  managerEntries,
  babelDefault,
};
