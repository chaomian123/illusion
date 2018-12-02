const fs = require('fs')
//首页具有评论功能, 故而引入评论模块
const comment = require('../model/comment')
//自定义函数,目的是让调试更有效
const log = console.log.bind(console)

//定义
const sendHtml = (path, response, id, label) => {
    let options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        if (id !== undefined) {
            //用label来替换id
            data = data.replace(label, id)
        } else {
        }
        response.send(data)
    })
}
//
const resume = {
    path: '/resume',
    method: 'get',
    func: (request, response) => {
        let path = 'resume.html'
        sendHtml(path, response)
    }
}

const index = {
    path: '/',
    method: 'get',
    func: (request, response) => {
        let path = 'blog_index.html'
        sendHtml(path, response)
    }
}

const blogDetail = {
    path: '/blog/:id',
    method: 'get',
    func: (request, response) => {
        let id = request.params.id
        log('id', id)
        let path = 'blog_detail.html'
        sendHtml(path, response, id, '{{blog_id}}')
    }
}

// 三个路由, 分别对应博客首页, 博文详情, 以及静态页(简历)
const routes = [
    index,
    blogDetail,
    resume,
]

module.exports.routes = routes
