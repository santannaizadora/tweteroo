import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.listen(5000);


let users = [];
let tweets = [];

const isValidImage = (image) => {
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    if (image.match(regex)) {
        return true;
    } else {
        return false;
    }
}

app.post('/sign-up', (req, res) => {
    const user = req.body;

    if (!user.username || !user.avatar) {
        res.status(400).send('Todos os campos são obrigatórios!');
        return;
    }

    if (users.find(u => u.username === user.username)) {
        res.status(400).send('Usuário já existe!');
        return;
    }

    if (!isValidImage(user.avatar)) {
        res.status(400).send('Imagem inválida!');
        return;
    }

    users.push(user);
    console.log(users);
    res.send("OK");
});

app.get('/tweets', (req, res) => {
    const postCount = tweets.length;
    const perPage = 10;
    const pageCount = Math.ceil(postCount / perPage);

    let page = parseInt(req.query.page);
    if (page < 1){
        res.status(400).send('Informe uma página válida!');
        return;
    };
    if (page > pageCount && pageCount > 0){
        res.status(404).send('Não há mais páginas!');
        return;
    };

    const from = postCount - ((page - 1) * perPage);
    let to = postCount - (page * perPage);
    if (to < 0) to = 0;
    console.log(from, to);
    res.send(tweets.slice(to, from).reverse());
});

app.get('/tweets/:USERNAME', (req, res) => {
    const user = users.find(u => u.username === req.params.USERNAME);
    if (!user) {
        res.status(404).send('Usuário não encontrado!');
        return;
    }
    const userTweets = tweets.filter(t => t.username === user.username);
    res.send(userTweets);
});


app.post('/tweets', (req, res) => {
    const tweet = req.body;
    const username = req.headers.user;
    if (!tweet.tweet || !username) {
        res.status(400).send('Todos os campos são obrigatórios!');
        return;
    }
    const response = {
        username: username,
        avatar: users.find(user => user.username === username).avatar,
        tweet: tweet.tweet
    }
    tweets.push(response);
    res.status(201).send(response);
});
