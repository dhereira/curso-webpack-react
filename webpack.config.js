const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = { //este es un objeto donde viviran las configuraciones
    entry: './src/index.js',
    output: {
        path : path.resolve(__dirname,'dist'), //se crea la carpeta dist, se puede cambiar el nombre pero no se recomienda por ser un estandar
        filename: 'bundle.js',
        publicPath: '/',
 
    },
    resolve: {
        extensions:['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname,'src/components/'),
            'styles': path.resolve(__dirname, 'src/styles/')
        } 
    },
    mode: 'production',
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                use:{
                    loader: 'babel-loader',
                }
            },
            {
                test:/\.html$/,
                use: [
                    {loader: 'html-loader'}
                ]
            },
            {
                test:/\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
       new HtmlWebpackPlugin({
           template: './public/index.html',
           filename: './index.html'
       }),
       new MiniCssExtractPlugin({
        filename: '[name].css'
       }),
       new CleanWebpackPlugin(),
    ],
optimization:{
    minimize: true,
    minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
    ]
}
}