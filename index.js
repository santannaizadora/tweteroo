import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.listen(5000);


const users = [];
const tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub1"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub2"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub3"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub4"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub5"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub6"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub7"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub8"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub9"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub10"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub11"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub12"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub13"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub14"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub15"
    },
    {
        username: "bobesponja",
        tweet: "eu amo o hub16"
    }
];

app.post('/sign-up', (req, res) => {
    const user = req.body;
    users.push(user);
    console.log(users);
    res.send("OK");
});

app.get('/tweets', (req, res) => {
    res.send(tweets.slice(-10).reverse());
});  