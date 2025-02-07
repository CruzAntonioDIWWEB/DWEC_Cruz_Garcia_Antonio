import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import { text } from 'stream/consumers';

export default merge(common, {
    output: {
        filename: 'bundle.legacy.js',
    },
    modeule: { 
        rules:  [
            {
                text: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ],
    },
});