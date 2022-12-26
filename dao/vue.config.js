const path = require('path')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}


module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    chainWebpack: config => {
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/svgIcon/svg')) //处理svg目录（根据你建的文件路径）
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },


    devServer: {
        // 配置服务器代理
        proxy: {
            "/apis": { // 代理接口前缀为/apis的请求
                "target": 'http://localhost:8080/', // 对应的代理地址
                "secure": false, // 接受运行在https上，默认不接受
                "changeOrigin": true, // 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
                "pathRewrite": { //重写路径 比如'/apis/aaa/ccc'重写为'/aaa/ccc'
                    '^/apis': ''
                }
            },
            // 配置多个代理
            //   "/service": {
            //     "target": 'https://www.google.com/',
            //     "secure": false,
            //     "changeOrigin": true,
            //   },
        }
    }
}