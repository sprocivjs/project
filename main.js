
let usersData = document.getElementById('usersData');
let urlUsers = new URL('https://jsonplaceholder.typicode.com/users');

fetch(urlUsers)
    .then(value => value.json())
    .then(users => {
        for (const user of users) {
            let divUserBlock = document.createElement('div');
            divUserBlock.classList.add('user-block')
            let h1 = document.createElement('h1');
            h1.innerText = `${user.id} ${user.name}`;

            let a = document.createElement('a');
            a.innerText = 'Read more';
            a.href = 'user-details.html?data=' + JSON.stringify(user);
            divUserBlock.append(h1, a);
            usersData.appendChild(divUserBlock);
        }
    });
