let urlUser = new URL(location.href);
let user = JSON.parse(urlUser.searchParams.get('data'));
let divDetailsBlock = document.getElementById('user-details');

for (const item in user) {
    let divDtailInfo = document.createElement('div');
    divDtailInfo.classList.add('div-detail-info')
    divDtailInfo.innerText = `${item}: `;
    divDetailsBlock.appendChild(divDtailInfo);


    if (typeof user[item] !== 'object') {
        divDtailInfo.innerText = `${item}: ${user[item]}`;
    }

    function getUserDetails(obj) {
        if (typeof obj === 'object') {
            for (const element in obj) {
                let addInfo = document.createElement('div');
                addInfo.innerText = `${element}: `;
                divDtailInfo.append(addInfo);

                if (typeof obj[element] !== 'object') {
                    addInfo.innerText = `${element}: ${obj[element]}`;
                    divDtailInfo.append(addInfo);
                } else {
                    getUserDetails(obj[element]);
                }
            }
        }
    }

    getUserDetails(user[item]);
}


// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

let buttUserDetails = document.getElementsByTagName("button")[0];
buttUserDetails.id = 'butt-User-Details';

buttUserDetails.onclick = function (eo) {
    eo.preventDefault();
    let usersPostsBlock = document.createElement('div');
    usersPostsBlock.id = 'userPosts';
    let h2PostTitle = document.createElement('h2');
    h2PostTitle.innerText = 'User Posts';

    usersPostsBlock.appendChild(h2PostTitle);

    let urlPosts = new URL('https://jsonplaceholder.typicode.com/posts?userId=' + JSON.stringify(user.id));

    fetch(urlPosts)
        .then(value => value.json())
        .then(posts => {
            for (const post of posts) {

                let divPostBlock = document.createElement('div');
                divPostBlock.classList.add('post-block');
                let a = document.createElement('a');
                a.innerText = post.title;
                a.href = 'post-details.html?data=' + JSON.stringify(post);

                divPostBlock.appendChild(a);
                usersPostsBlock.appendChild(divPostBlock);

            }
        });
    document.body.appendChild(usersPostsBlock);
};

buttUserDetails.addEventListener("click", function () {
    buttUserDetails.setAttribute('disabled', 'disabled ');
})


