const fs = require('fs')

const blogFilePath = 'db/blog.json'

class ModelBlog {
    constructor(form) {

        this.title = form.title || ''
        this.author = form.author || ''
        this.content = form.content || ''
        this.created_time = Math.floor(new Date() / 1000)
    }
}

const loadBlogs = () => {
    let content = fs.readFileSync(blogFilePath, 'utf8')
    let blogs = JSON.parse(content)
    return blogs
}



const b = {
    data: loadBlogs(),
}

b.all = function() {
    let blogs = this.data
    // 遍历 blog，插入 comments
    let comment = require('./comment')
    let comments = comment.all()
    for (let i = 0; i < blogs.length; i++) {
        let blog = blogs[i]
        let cs = []
        for (let j = 0; j < comments.length; j++) {
            let c = comments[j]
            if (blog.id === c.blog_id) {
                cs.push(c)
            }
        }
        blog.comments = cs
    }
    return blogs
}

b.new = function(form) {
    let m = new ModelBlog(form)
    // console.log('new blog', form, m)
    // 设置新数据的 id
    let d = this.data[this.data.length - 1]
    if (d === undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 把数据加入 this.data 数组
    this.data.push(m)
    this.save()
    return m
}

b.delete = function(id) {
    let blogs = this.data
    let found = false
    for (let i = 0; i < blogs.length; i++) {
        let blog = blogs[i]
        if (blog.id === id) {
            found = true
            break
        }
    }

    blogs.splice(i, 1)
    return found
}
b.get = function(id) {
    let blogs = this.data
    for (let i = 0; i < blogs.length; i++) {
        let blog = blogs[i]
        if (blog.id === id) {
            return blog
        }
    }
    return {}
}

b.save = function() {
    let s = JSON.stringify(this.data, null, 2)
    fs.writeFile(blogFilePath, s, (error) => {
        if (error !== null) {
            console.log('error', error)
        } else {
            console.log('保存成功')
        }
    })
}

module.exports = b
