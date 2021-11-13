// @see https://redwoodjs.com/docs/storybook

module.exports = {
  stories: [], //'../src/**/*.stories.@(js|tsx|mdx)'
  addons: [
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        // babelOptions: {},
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
        // transcludeMarkdown: true,
      },
    },
  ],
}
