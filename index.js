import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.listen(5000);


const users = [];


app.post('/sign-up', (req, res) => {
    const user = req.body;
    users.push(user);
    console.log(users);
    res.send("OK");
});
