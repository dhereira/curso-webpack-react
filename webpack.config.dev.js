const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = { //este es un objeto donde viviran las configuraciones
    entry: './src/index.js',
    output: {
        path : path.resolve(__dirname,'dist'), //se crea la carpeta dist, se puede cambiar el nombre pero no se recomienda por ser un estandar
        filename: 'bundle.js',
    },
    resolve: {
        extensions:['.js', '.jsx']
    },
    mode: 'development',
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
       })
    ],
    devServer: {
       static: {
         directory: path.join(__dirname,'dist'),
         watch: true
       },
       watchFiles: path.join(__dirname,'./**'),
       compress: true,
       historyApiFallback: true, //para tener una historia en el navegador
       port: 3006,
       open: true,
    }

}