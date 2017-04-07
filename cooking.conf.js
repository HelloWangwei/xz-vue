const cooking = require('cooking');


cooking.set({
    history: true,
    entry: './client/app.js',
    dist: './dist',
    hash: true,
    sourceMap: true,
    template: './client/index.html',
    devServer: {
        port: 3001,
        publicPath: '/'
    },
    clean: true,
    publicPath: '/',
    extends: ['vue2'],
    externals: {
        jquery: 'jQuery',
        bootstrap: 'bootstrap',
        layui: 'layui'
    }
});
module.exports = cooking.resolve();