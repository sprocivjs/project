
let urlPost = new URL(location.href);
let post = JSON.parse(urlPost.searchParams.get('data'));
let divPostsBlock = document.getElementById('user-posts');


function getPostInfo (obj) {
    for (const item in obj) {

        if (typeof obj[item] === 'object') {
            let addBlock = document.createElement('div');
            addBlock.innerText = item;
            getPostInfo(obj[item]);

        } else {
            let divPostInfo = document.createElement('div');
            divPostInfo.classList.add('user-posts-info');

            divPostInfo.innerText = `${item}: ${obj[item]}`;

            divPostsBlock.appendChild(divPostInfo);
        }
    }
}
getPostInfo(post);


let urlComments = new URL('https://jsonplaceholder.typicode.com/posts/' + JSON.stringify(post.id) + '/comments');
let postComments = document.getElementById('post-comments');

fetch(urlComments)
    .then(value => value.json())
    .then(comments => {
        for (const comment of comments) {
                let divCommentBlock = document.createElement('div');
                divCommentBlock.classList.add('comment-block');

            for (const item in comment) {
                let divComment = document.createElement('div');
                divComment.classList.add('comment-info');
                divComment.innerText = `${item}: ${comment[item]}`;
                divCommentBlock.appendChild(divComment);
            }
                postComments.appendChild(divCommentBlock);
        }
    });


