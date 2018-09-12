const fs = require('fs')

const FilePath  = 'db/comment.json'

// 这是一个用来存储 comment 数据的对象
class ModelComment {
    constructor(form) {

        this.author = form.author || ''
        this.content = form.content || ''
        this.blog_id = Number(form.blog_id) || 0
        this.created_time = Math.floor(new Date() / 1000)
    }
}

const loadData = () => {

    let content = fs.readFileSync(FilePath, 'utf8')
    let data = JSON.parse(content)
    return data
}

const b = {
    data: loadData(),
}

b.all = function() {
    return this.data
}
b.get = function(blog_id) {
    let comments = this.data
    let arr = []
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i]
        if (comment.blog_id === blog_id) {
            arr.push(comment)
        }
    }
    if (arr) {
        return arr
    }
    return {}
}
b.new = function(form) {
    let m = new ModelComment(form)
    // console.log('new blog', form, m)
    // 设置新数据的 id
    let d = this.data[this.data.length - 1]
    if (d === undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    this.data.push(m)
    this.save()
    return m
}

b.save = function() {
    let s = JSON.stringify(this.data, null, 2)
    fs.writeFile(FilePath, s, (error) => {
        if (error !== null) {
            console.log('error', error)
        } else {
            console.log('保存成功')
        }
    })
}

module.exports = b
