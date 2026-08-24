const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { pluginName } = require('mini-css-extract-plugin');

module.exports = {
    plugins:[
        autoprefixer,
        cssnano({ present: 'default'})
    ]
};

