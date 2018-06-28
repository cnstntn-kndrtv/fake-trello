const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
const NODE_ENV = process.env.NODE_ENV || 'development';

// Constant with our paths
const paths = {
    DIST : path.resolve(__dirname, 'assets/build'),
    SRC : path.resolve(__dirname, 'src')
};

var devtool;
if (NODE_ENV==='test') {
	devtool = 'eval';
}
else if (NODE_ENV==='development') {
	devtool = 'source-map';
}
else { // prod
	devtool = 'eval';
}

const config = {
    
    mode: NODE_ENV || 'development',
    
    watch: NODE_ENV == 'development',
    
    devtool: devtool,
    
    entry: ['babel-polyfill', path.join(paths.SRC, "index.js")],
    output : {
        path : paths.DIST,
        publicPath: __dirname + '.tmp/public/build',
        filename : '[name].bundle.js',
        sourceMapFilename: '[name].bundle.js.map',
    },
    
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: '_vendor',
                    chunks: 'all',
                    reuseExistingChunk: false,
                },
            }
        }

    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    },


    plugins: [
        new ProgressBarPlugin(),

        new CleanWebpackPlugin([paths.DIST]),
        // new HtmlWebpackPlugin({
        //     template: path.join(paths.SRC, "index.html"),
        //     filename: "./index.html",
        //     title: 'Fake-trello',
        // }),

        // css
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css",
            chunkFilename: '[name].css',
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
              discardComments: { removeAll: true },
              zindex: false,
            },
            canPrint: true,
        }),

        // env
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
    ],

    resolve: {
        extensions: [".js", ".jsx"]
    },

    devServer: {
        port: 3001
    }
};

if (NODE_ENV === 'none') {
    config.plugins.push(new BundleAnalyzerPlugin())
}

// works with webpack dev server
// if (NODE_ENV === 'development') {
//     config.entry = [
//         'webpack-hot-middleware/client',
//         './src/index'
//     ];
//     config.plugins.push(new webpack.HotModuleReplacementPlugin());
// }

if (NODE_ENV === 'production') {
    console.log('----!!!!!!!!!!------');
    
    config.plugins.push(new CompressionPlugin({
        test: /\.js/,
        algorithm: 'gzip',
    }))
}

module.exports = config;