const path = require('path');
module.exports = {
    entry: './static/src/ts/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /chess.js/,
                parser: {
                    amd: false,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static/public/js'),
    },
    mode: 'development',
};
