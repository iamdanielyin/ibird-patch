'use strict';

/**
 * 主模块
 * Created by yinfxs on 2017/4/7.
 */

const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');
const _ = require('lodash');
const AdmZip = require('adm-zip');
const app = {patchs: []};
module.exports = app;

/**
 * 初始化配置
 * @param obj 配置对象
 * @returns {Array.<*>}
 */
app.config = (obj) => {
    if (!obj || !_.isObject(obj)) return;
    if (_.isArray(obj)) return app.patchs = app.patchs.concat(obj);
    app.patchs.push(obj);

};
/**
 * 按配置输出补丁
 */
app.output = () => {
    if (!_.isArray(app.patchs) || app.patchs.length == 0) return;
    for (const item of app.patchs) {
        if (!_.isObject(item) || !_.isString(item.output)) continue;
        if (!item.sources || Object.keys(item.sources).length == 0) continue;
        item.output = path.resolve(process.cwd(), item.output);
        const compress = item.compress == true ? true : false;
        //确保目录存在
        fsx.ensureDirSync(item.output);
        //清空目录
        fsx.emptyDirSync(item.output);

        for (let src in item.sources) {
            if (!src || src.length == 0) continue;
            let dest = item.sources[src], filter = null;
            const omit = src[0] == '!' ? true : false;
            src = omit ? src.substring(1) : src;
            src = path.resolve(process.cwd(), src);

            try {
                //1.如果是dest配置的是字符串，则直接复制目录或文件
                if (_.isString(dest)) {
                    const _dest = path.resolve(item.output, dest);
                    fs.accessSync(src, fs.constants.R_OK);
                    fsx.copySync(src, _dest);
                    continue;
                }
                if (!(_.isObject(dest) && !_.isArray(dest))) continue;

                if (!omit) {
                    for (let key in dest) {
                        if (!key || !dest[key]) continue;
                        const _src = path.resolve(src, key);
                        const _dest = path.resolve(item.output, dest[key]);
                        fs.accessSync(_src, fs.constants.R_OK);
                        fsx.copySync(_src, _dest);
                    }
                } else {
                    //2.如果是对象配置，则再做处理
                    if (!dest.dest || !dest.filter) continue;

                    filter = _.isArray(dest.filter) ? dest.filter : dest.filter.split(' ');
                    dest = dest.dest;

                    const stat = fs.statSync(src);
                    if (!stat || !stat.isDirectory()) continue;
                    //3.执行复制

                    const files = fs.readdirSync(src);
                    if (files.length == 0) continue;
                    for (const item of files) {
                        if (filter.indexOf(item) >= 0) continue;
                        const _src = path.resolve(src, item);
                        const _dest = path.resolve(item.output, dest, item);
                        fs.accessSync(_src, fs.constants.R_OK);
                        fsx.copySync(_src, _dest);
                    }
                }
            } catch (e) {
                console.error(e.message);
                continue;
            }
        }
        if (!compress) {
            console.log(`生成补丁成功：${item.output}`);
            continue;
        }
        const targetFileName = `${item.output}.zip`;
        fsx.removeSync(targetFileName);
        //压缩
        const zip = new AdmZip();
        zip.addLocalFolder(item.output, path.parse(item.output).base);
        zip.writeZip(targetFileName, (err) => {
            if (err) return console.error(`生成补丁失败：${err.message}`);
            fsx.removeSync(item.output);
        });
        console.log(`生成补丁成功：${targetFileName}`);
    }
};