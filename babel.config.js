const { version } = require("html-webpack-plugin");

const presets = [
  [
    "@babel/preset-env", {
      targets: {
        edge: "17",
        ie: "11",
        firefox: "50",
        chrome: "64",
        safari: "11.1",
      },
      // useBuiltIns: "entry",
    }],
];

const plugins = [[
  "babel-plugin-polyfill-corejs3", {
    method: "usage-pure", 
    version: "3.50"
  }]
]


module.exports = { presets, plugins };
