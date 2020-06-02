const { resolve } = require('path')
const {
  override,
  addDecoratorsLegacy,
  addBabelPlugins,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra')
const WebpackBar = require('webpackbar')
const { getThemeVariables } = require('antd/dist/theme')

const addPlugins = () => (config) => {
  config.plugins.push(
    new WebpackBar({
      color: '#69c0ff',
      name: '❖',
    })
  )

  Object.assign(config, {
    optimization: {
      ...config.optimization,
      namedModules: true,
      namedChunks: true,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: { default: false },
      },
    },
  })

  return config
}

module.exports = override(
  addDecoratorsLegacy(),
  ...addBabelPlugins(
    '@babel/plugin-transform-spread',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-do-expressions',
    ...(process.env.REMOVE_CONSOLE ? [['transform-remove-console', { exclude: ['error', 'warn'] }]] : [])
  ),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    options: {
      modifyVars: getThemeVariables({
        dark: true, // enable dark mode
        compact: true, // enable compact mode
      }),
      javascriptEnabled: true,
    },
  }),
  addWebpackAlias({
    '@layouts': resolve(__dirname, './src/layouts'),
  }),
  addPlugins()
)
