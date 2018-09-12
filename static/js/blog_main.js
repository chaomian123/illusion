const ajax = function(request) {
    let r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

const templateBlog = function(blog) {
    let id = blog.id
    let title = blog.title
    let initiale = title.trim().slice(0, 1)
    let author = blog.author
    let d = new Date(blog.created_time * 1000)
    let time = d.toLocaleString()
    let t = `
        <div class="gua-blog-cell">
            <div class="gua-post">
                <h2 class="article-title">
                <span class="article-initial">${initiale}</span>
                <a class="blog-title" href="/blog/${id}" data-id="${id}">
                    ${title}
                </a>
                </h2>
                <div class="subline">
                <span>${author}</span> 发布于 <time>${time}</time>
                <p class="i-need-more-detail"><a href="/blog/${id}" >阅读更多....</a></p>
            </div>
            </div>
            
            <div class="blog-comments">
                <div class="new-comment">
                    <input class="comment-blog-id" type=hidden value="${id}">
                    <input class="comment-author" value="" placeholder="评论者">
                    <input class="comment-content" value="" placeholder="评论内容">
                    <button class="comment-add">添加评论</button>
                </div>
            </div>
        </div>
    `
    return t
}
const es = sel => document.querySelectorAll(sel)
const e = sel => document.querySelector(sel)
const log = console.log.bind(console)
const commentNew = (data, callback) => {
    data = JSON.stringify(data)
    let request = {
        method: 'POST',
        url: '/api/comment/add',
        contentType: 'application/json',
        data: data,
        callback: (response) => {
            let c = JSON.parse(response)
            callback(c)
        }
    }
    ajax(request)
}
const insertBlogAll = function(blogs) {
    let html = ''
    for (let i = blogs.length - 1; i > -1; i--) {
        let b = blogs[i]
        let t = templateBlog(b)
        html += t
    }
    let div = document.querySelector('.gua-blogs')
    div.insertAdjacentHTML('beforeend', html)
    // div.innerHTML = html
}

const blogAll = function() {
    let request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            let blogs = JSON.parse(response)
            window.blogs = blogs
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}
const commentAll = function (form) {
    let request = {
        method: 'GET',
        url: '/api/comment/all',
        contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response)
            let blogs = JSON.parse(response)
            window.blogs = blogs
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

const blogNew = function(form) {
    let data = JSON.stringify(form)
    let request = {
        method: 'POST',
        url: '/api/blog/add',
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            console.log('响应', response)
            let res = JSON.parse(response)
            blogAll()
        }
    }
    ajax(request)
}


const bindEvents = function() {
    let button = e('#id-button-submit')
    button.addEventListener('click', (event) => {
        console.log('click new')
        let form = {
            title: e('#id-input-title').value,
            author: e('#id-input-author').value,
            content: e('#id-input-content').value,
            mima: e('#id-input-mima').value,
        }
        blogNew(form)
    })
}

const commentOutPutDataClean = (data) => {
    let blogId = data.blog_id
    let author = data.author
    let content = data.content
    if (author.trim() === '') {
        data.author = '不知姓名的围观群众'
    }
    if (content.trim() === '') {
        data.content = '<del>张了张嘴, 最后还是啥都没说</del>'
    }
    return data
}

const actionCommentAdd = (event) => {
    let self = event.target
    let form = self.closest('.new-comment')
    let blogId = form.querySelector('.comment-blog-id').value
    let author = form.querySelector('.comment-author').value
    let content = form.querySelector('.comment-content').value
    let data = {
        blog_id: blogId,
        author: author,
        content: content,
    }
    commentOutPutDataClean(data)

    commentNew(data, (response) => {
        // log('response', response)
    })

}
document.body.addEventListener('click', (event) => {
    let self = event.target
    if (self.classList.contains('comment-add')) {
        actionCommentAdd(event)
    }
})
const __main = function() {
    // 载入博客列表
    blogAll()
    bindEvents()
}

__main()
