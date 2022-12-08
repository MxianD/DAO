const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    configureWebpack: {
        resolve: {
            //路径别名配置
            alias: {
                '@': resolve('src'),
                'assets': resolve('@/assets'),
                'common': resolve('@/common'),
                'components': resolve('@/components'),
                'network': resolve('@/network'),
                'views': resolve('@/views'),
            }
        }
    },

    chainWebpack: (config) => {
        //配置 svg-sprite-loader
        // 第一步：让其他svg loader不要对src/icons进行操作
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons/svg')) //注意：路径要具体到存放的svg的路径下，不然会报错
            .end()
            // 第二步：使用svg-sprite-loader 对 src/icons下的svg进行操作
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons/svg')) //注意：路径要具体到存放的svg的路径下，不然会报错
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            //定义规则 使用时 <svg class="icon"> <use xlink:href="#icon-svg文件名"></use>  </svg>
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}