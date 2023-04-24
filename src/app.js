import prisma from '../prisma/index.js'
import express from 'express';
import getSkipValueFromPage from './helpers/getSkipValueFromPage.js';

const app = express()
const port = 3000;
// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {
    res.send('twitter BE API')
});

app.get('/tweets', async (req, res , next) => {
    try {
        const totalTweets = await prisma.tweet.count();
        const totalPages = Math.ceil(totalTweets / 10); // assuming 10 posts per page
        let currentPage = req.query ? +req.query.page :  1;

        let itemsPerPage = 5;
        let tweets =await prisma.tweet.findMany({
            orderBy :{
                id:"desc"
            },
            include : {
                author:{
                    select: {
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



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})