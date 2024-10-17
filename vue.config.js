const {defineConfig} = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = defineConfig({
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                algorithm: 'gzip',
                test: /\.(js|css|html)$/,
                threshold: 10240,
                minRatio: 0.9,
                deleteOriginalAssets: false,
            })
        ]
    },
    transpileDependencies: [
        'quasar'
    ],
    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false
        }
    },
    chainWebpack: (config) => {
        config.plugin('define').tap((definitions) => {
            Object.assign(definitions[0], {
                __VUE_OPTIONS_API__: 'true',
                __VUE_PROD_DEVTOOLS__: 'false',
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
            })
            return definitions
        })
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

})
