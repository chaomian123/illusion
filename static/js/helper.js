
const initCommentBoxContent = (box) => {
    let author = box.querySelector('.comment-author')
    let content = box.querySelector('.comment-content')
    content.value = ''
    author.value = ''
}
const initPostBoxContent = () => {
    let title = e('#id-input-title')
    let author = e('#id-input-author')
    let content = e('#id-input-content')
    content.value = ''
    author.value = ''
    title.value = ''
}

const bindEventCommentBox = () => {
    let postbtn = es('.comment-add')
    let blogContainer = e('.gua-blogs')
    blogContainer.addEventListener('click', (event) => {
        let self = event.target
        if (self.classList.contains('comment-add')) {
            let box = self.closest('.new-comment')
            setTimeout(() => {
                initCommentBoxContent(box)
            }, 800)
        }
    })

}

const bindEventPostWindowPop = () => {
    let container = e('.pop-post-window')
    let btn = e('#id-post-btn')
    let clostbtn = e('.close-button')
    let postbtn = e('#id-button-submit')
    let wrapper = e('.blog-wrapper')

    postbtn.addEventListener('click', (event) => {
        wrapper.classList.toggle('i-cant-focus-really')
        container.classList.toggle('show')
        initPostBoxContent()
        event.preventDefault()
    })
    btn.addEventListener('click', (event) => {
        wrapper.classList.toggle('i-cant-focus-really')
        container.classList.toggle('show')
        event.preventDefault()
    })
    clostbtn.addEventListener('click',(event) => {
        wrapper.classList.toggle('i-cant-focus-really')
        container.classList.toggle('show')
        event.preventDefault()
    })
}

const __actions = () => {
    bindEventPostWindowPop()
    bindEventCommentBox()
}

__actions()