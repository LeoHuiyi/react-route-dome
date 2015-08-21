var webpack = require('webpack');

module.exports = {
    //插件项
    plugins: [new webpack.optimize.MinChunkSizePlugin({
        compress: {
            warnings: false
        }
    })],
    //页面入口文件配置
    entry: {
        index: './app/js/main.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/js',
        filename: 'main.js'
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss', '.jsx']
    }
};
