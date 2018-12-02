// 引入 express 并且创建一个 express 实例赋值给 app
const express = require('express')
const bodyParser = require('body-parser')
const { log } = require('./utils')

console.log('log', log)

const app = express()
//配置bodyParser
app.use(bodyParser.json())

// 配置静态文件目录
app.use(express.static('static'))


const registerRoutes = (app, routes) => {
    for (let i = 0; i < routes.length; i++) {
        let route = routes[i]

        app[route.method](route.path, route.func)
        // app.get('/', () => {})
        // app['get'](path, () => {})
    }
}

// const routeModules = [
//     './route/index',
//     './route/blog',
//     './route/comment',
// ]

// 导入 route/index.js 的所有路由数据
const routeIndex = require('./route/index')
registerRoutes(app, routeIndex.routes)

// 导入 route/blog 的所有路由数据
const routeBlog = require('./route/blog')
registerRoutes(app, routeBlog.routes)

// 导入 route/comment 的所有路由数据
// const routeComment = require('./route/comment')
// registerRoutes(app, routeComment.routes)
//
// const routes = [
//     routeBlog,
//     routeIndex,
//     routeComment,
// ]
//
// for (let r in routes) {
//     registerRoutes(app, r.routes)
// }


const main = () => {
    // listen 函数的第一个参数是我们要监听的端口
    // 这个端口是要浏览器输入的
    // 默认的端口是 80
    // 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
    // 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
    let server = app.listen(18080, () => {
        let host = server.address().address
        let port = server.address().port

        log(`应用实例，访问地址为 http://${host}:${port}`)
    })


}

if (require.main === module) {
    main()
}
