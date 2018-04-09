/**
 * # 下面的打包模式只是针对html+js, 不涉及样式css的打包
 *
 * ## es:
 * 组件库, 开发模式, 整体引入模式
 *
 *  - vue sfc -> es6
 *  - no style
 *  - prettier
 *
 * ## lib:
 * 组件, 单独使用, 需要依赖的组件及资源全部打包组件中, 组件作为独立入口, 不涉及样式css的打包
 *
 *  - vue sfc -> buble -> es5
 *  - no style
 *  - sourcemaps
 *  - uglify
 * */

const fs = require('fs');
const startcase = require('lodash.startcase');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const sourceMaps = require('rollup-plugin-sourcemaps');
const uglify = require('rollup-plugin-uglify');
const prettier = require('rollup-plugin-prettier');

var config = require('./build-config');
const { srcPath, esPath, libPath } = config;

async function build(componentName, isEsBoundle = true) {

    // The entry of components: xx/index.js
    const inputPath = `${srcPath}/components/${componentName}/index.js`;
    const outputESPath = `${esPath}/components/${componentName}/index.js`;
    const outputLibPath = `${libPath}/components/${componentName}/index.js`;

    // action-sheet => ActionSheet
    const outputName = startcase(componentName).split(' ').join('');

    let inputOptions = {};
    let outputOptions = {};

    if (!isEsBoundle) {
        // for lib
        inputOptions = {
            input: inputPath,
            plugins: [
                vue({
                    compileTemplate: true,
                    css: false
                }),
                uglify({
                    warnings: false,
                    compress: {
                        drop_console: true
                    },
                    sourceMap: true
                }),
                buble(),
                sourceMaps(),
                resolve()
            ]
        };

        outputOptions = {
            file: outputLibPath,
            name: outputName,
            format: 'umd',
            sourcemap: true,
        };
    } else {
        // for ES
        inputOptions = {
            input: inputPath,
            external(id) {
                if (id.split('/').slice(-1)[0] === `${componentName}.vue`) return false;
                return /(util)|(^\.\/)|(^\.\.\/)/.test(id);
            },
            plugins: [
                vue({
                    compileTemplate: true,
                    css: false
                }),
                prettier({
                    tabWidth: 2,
                    singleQuote: false,
                }),
                resolve()
            ]
        };

        outputOptions = {
            file: outputESPath,
            format: 'es',
        };
    }

    // create a bundle
    try {
        const bundle = await rollup.rollup(inputOptions);
        // or write the bundle to disk
        await bundle.write(outputOptions);
    }
    catch (e) {
        console.error(`Error occurs when rollup component of ${componentName}, more details here:`);
        console.error(e);
    }
}

function getComponentFileNames() {
    return new Promise((resolve, reject) => {
        fs.readdir(`${srcPath}/components`, function (err, files) {
            if (err) {
                reject(err);
                throw err;
            }

            // ignore hidden file or private file, eg: .DS_Store / _tmp
            let filterCondition = (fileName) => {
                return fileName.indexOf('.') === -1 && fileName.indexOf('_') !== 0;
            };

            // file names
            var componentsFileNames = files.filter((fileName) => filterCondition(fileName));

            resolve && resolve(componentsFileNames);
        });
    });
}

getComponentFileNames().then((componentsFileNames) => {
    console.log(componentsFileNames);
    componentsFileNames.forEach(name => {
        build(name, true);
        build(name, false);
    });
});
