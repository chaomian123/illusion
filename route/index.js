const fs = require('fs')
const comment = require('../model/comment')
const log = console.log.bind(console)
const sendHtml = (path, response, id, label) => {
    let options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        //如果id不是undefined 说明传了id 此时对label进行替换
        if (id !== undefined) {
            data = data.replace(label, id)
        } else {
        }
        response.send(data)
    })
}

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
        // let options = {
        //     encoding: 'utf-8'
        // }
        // path = 'template/' + path
        // fs.readFile(path, options, (error, data) => {
        //     if (id !== undefined) {
        //         data = data.replace('{{blog_id}}', id)
        //     } else {
        //
        //     }
        //     response.send(data)
        // })
    }
}

const routes = [
    index,
    blogDetail,
    resume,
]

// module.exports = {
//     routes: routes,
// }
module.exports.routes = routes
