const { Router } = require('express');
const { get: getRequest } = require('superagent');

const router = new Router();

const apiKey = process.env.TMDB_API_KEY;
const host = 'https://api.themoviedb.org/3';

router.get('/search/:search', async (req, res) => {
    try {
        const apiAddress = `${host}/search/movie?include_adult=false&page=1&query=${req.params.search}&language=en-US&api_key=${apiKey}`;
        const { body: responseBody } = await getRequest(apiAddress);

        if (responseBody.results.length < 1) return res.sendStatus(404);

        return res.status(200).send({ data: responseBody });
    } catch (error) {
        return res.sendStatus(400);
    }
});

module.exports = router;
