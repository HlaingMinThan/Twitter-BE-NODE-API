import prisma from '../prisma/index.js'
import express from 'express';
import getSkipValueFromPage from './helpers/getSkipValueFromPage.js';

const app = express();

app.use(express.json())
const port = 3000;
// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {
    res.send('twitter BE API')
});

app.get('/users/:id', async (req,res,next) => {
    try {
        let user = await prisma.user.findUnique({
            where : {
                id : +req.params.id
            },
        });

        return res.json(user);
    }catch(e){
        next(e)
    }
})

app.get('/tweets', async (req, res , next) => {
    try {
        const totalTweets = await prisma.tweet.count();
        let itemsPerPage = 10;
        const totalPages = Math.ceil(totalTweets / itemsPerPage);
        let currentPage = req.query ? +req.query.page :  1;

        let tweets =await prisma.tweet.findMany({
            orderBy :{
                id:"desc"
            },
            include : {
                author:{
                    select: {
                        id : true,
                        name : true,
                        username : true,
                        profile : true
                    },
                }
            },
            take : itemsPerPage,
            skip : getSkipValueFromPage(currentPage,itemsPerPage)
        })
        res.json({
            data : tweets,
            totalPages,
            currentPage
        });
    }catch(e){
        next(e)
    }
})
app.post('/tweets',async (req,res,next) => {
    try {
        let { description } = req.body;

        let tweet = await prisma.tweet.create({
            data : {
                description,
                authorId : 1
            }
        });

        return res.json(tweet);
    }catch(e) {
        next(e)
    }
})

app.get('/tweets/:id', async (req,res,next) => {
    try {
        let tweet = await prisma.tweet.findUnique({
            where : {
                id : +req.params.id
            },
            include : {
                author : {
                    select : {
                        id : true,
                        name : true,
                        profile : true,
                        username : true
                    }
                }
            }
        })
        res.json(tweet)
    }catch(e) {
        next(e)
    }
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})