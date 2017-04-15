/**
 * Created by yinfxs on 2017/4/14.
 */

const path = require('path');
const patch = require('../lib/index.js');

const dest = '/Users/yinfxs/patch_dest';

const pro_output = path.resolve(dest, 'k11-dist-pro');
const test_output = path.resolve(dest, 'k11-dist-test');
const wosoft_output = path.resolve(dest, 'k11-dist-wosoft');
const just_for_test_output = path.resolve(dest, 'just_for_test');

patch.config([
    {
        output: pro_output,
        compress: false,
        sources: {
            '/Users/yinfxs/patch_source/k11-dist/cert': path.resolve(pro_output, 'cert'),
            '/Users/yinfxs/patch_source/k11-dist/clients/admin/dist': path.resolve(pro_output, 'clients/admin/dist'),
            '/Users/yinfxs/patch_source/k11-dist/clients/corp/dist': path.resolve(pro_output, 'clients/corp/dist'),
            '/Users/yinfxs/patch_source/k11-dist/modules': path.resolve(pro_output, 'modules'),
            '/Users/yinfxs/patch_source/k11-dist/utils': path.resolve(pro_output, 'utils'),
            '/Users/yinfxs/patch_source/k11-dist/index-pro.js': path.resolve(pro_output, 'index.js'),
            '/Users/yinfxs/patch_source/k11-dist/package-pro.json': path.resolve(pro_output, 'package.json')
        }
    },
    {
        output: wosoft_output,
        compress: false,
        sources: {
            '/Users/yinfxs/patch_source/k11-dist/cert': path.resolve(wosoft_output, 'cert'),
            '/Users/yinfxs/patch_source/k11-dist/clients/admin/dist': path.resolve(wosoft_output, 'clients/admin/dist'),
            '/Users/yinfxs/patch_source/k11-dist/clients/corp/dist': path.resolve(wosoft_output, 'clients/corp/dist'),
            '/Users/yinfxs/patch_source/k11-dist/modules': path.resolve(wosoft_output, 'modules'),
            '/Users/yinfxs/patch_source/k11-dist/utils': path.resolve(wosoft_output, 'utils'),
            '/Users/yinfxs/patch_source/k11-dist/index-wosoft.js': path.resolve(wosoft_output, 'index.js'),
            '/Users/yinfxs/patch_source/k11-dist/package-wosoft.json': path.resolve(wosoft_output, 'package.json')
        }
    },
    {
        output: test_output,
        compress: false,
        sources: {
            '/Users/yinfxs/patch_source/k11-dist/cert': 'cert',
            '/Users/yinfxs/patch_source/k11-dist/clients/admin/dist': 'clients/admin/dist',
            '/Users/yinfxs/patch_source/k11-dist/clients/corp/dist': 'clients/corp/dist',
            '/Users/yinfxs/patch_source/k11-dist/modules': 'modules',
            '/Users/yinfxs/patch_source/k11-dist/utils': 'utils',
            '/Users/yinfxs/patch_source/k11-dist/index-test.js': path.resolve(test_output, 'index.js'),
            '/Users/yinfxs/patch_source/k11-dist/package-test.json': path.resolve(test_output, 'package.json')
        }
    },
    {
        output: just_for_test_output,
        compress: false,
        sources: {
            '/Users/yinfxs/patch_source/k11-dist/cert': path.resolve(just_for_test_output, 'cert'),
            '/Users/yinfxs/patch_source/k11-dist/clients/admin/dist': {
                'app.js': path.resolve(just_for_test_output, 'clients/admin/dist/app.js'),
                'index.html': path.resolve(just_for_test_output, 'clients/admin/dist/index.html'),
                'vendors.js': path.resolve(just_for_test_output, 'clients/admin/dist/vendors.js'),
                'polyfill.js': path.resolve(just_for_test_output, 'clients/admin/dist/polyfill.js'),
                'style.css': path.resolve(just_for_test_output, 'clients/admin/dist/style20000.css'),
            },
            '!/Users/yinfxs/patch_source/k11-dist/clients/corp/dist': {
                dest: path.resolve(just_for_test_output, 'clients/corp/dist'),
                filter: 'assets page app.min.js'
            }
        }
    }
]);

patch.output();