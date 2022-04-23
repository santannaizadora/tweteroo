import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.listen(5000);


let users = [];
let tweets = [];

app.post('/sign-up', (req, res) => {
    const user = req.body;
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
