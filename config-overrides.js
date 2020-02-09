const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#5A8DF4',
            '@btn-primary-shadow': "box-shadow: 0px 20px 25px rgba(90, 141, 244, 0.16), 0px 10px 10px rgba(0, 0, 0, 0.04)",
            '@btn-shadow': '0 2px 0 rgba(0, 0, 0, 0.015)',
            '@btn-height-lg': '48px',
            '@btn-height-base': '40px',
            '@btn-height-sm': '32px',
            '@animation-duration-slow': '0s',
            '@shadow-1-down': 'none',
            '@font-family': '"Lato, sans-serif"',
            "@tag-default-bg": "#5A8DF4",
            "@tag-default-color": "#ffffff"
        },
    }),
);