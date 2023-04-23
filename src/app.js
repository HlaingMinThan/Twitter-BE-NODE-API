import prisma from '../prisma/index.js'
import express from 'express';

const app = express()
const port = 3000;
// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {
    res.send('twitter BE API')
});

app.get('/tweets', async (req, res) => {
    let tweets =await prisma.tweet.findMany({
        orderBy : {
            createdAt : 'desc'
        }
    })
    res.json(tweets);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})