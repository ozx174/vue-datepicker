const _import = require('../_import_' + 'production')

export default [
    { path: 'test', component: _import('test/index'), name: 'test' }
]
