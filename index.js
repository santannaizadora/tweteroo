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
    res.send(tweets.slice(-10).reverse());
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    const response = {
        username: tweet.username,
        avatar: users.find(user => user.username === tweet.username).avatar,
        tweet: tweet.tweet
    }
    tweets.push(response);
    console.log(response);
    res.send(response);
});
