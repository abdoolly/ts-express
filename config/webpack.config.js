const root = require('app-root-path').path;
const ReloadServerPlugin = require('reload-server-webpack-plugin');



module.exports = env => {
    return {
        entry: `${root}/bin/www.ts`,
        target: 'node',
        externals: [
            /^[a-z\-0-9]+$/ // Ignore node_modules folder
        ],
        devtool: 'inline-source-map',
        output: {
            filename: 'compiled', // output file
            path: `${root}/build`,
            libraryTarget: "commonjs"
        },
        resolve: {
            // Add in `.ts` and `.tsx` as a resolvable extension.
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
            modules: [
                `${root}/node_modules`,
                'node_modules'
            ],
            symlinks: false
        },
        resolveLoader: {
            //root: [`${root}/node_modules`],
        },
        module: {
            rules: [{
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                    }
                ]
            }]
        },
        plugins: !env ? [
            new ReloadServerPlugin({
                script: "build/compiled",
            }),
        ] : [],
        watch: false,
        mode: process.env.NODE_ENV || "developement"
    }
};