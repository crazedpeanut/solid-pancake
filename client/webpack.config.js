module.exports = {
    context: __dirname + "/src",
    entry: "./index",
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    output: {
        path: __dirname + "/assets/",
        filename: "bundle.js",
        publicPath: "/assets/",
    }
};