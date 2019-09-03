const { Router } = require('express');
const { get: getRequest } = require('superagent');

const router = new Router();

const apiKey = process.env.TMDB_API_KEY;
const host = 'https://api.themoviedb.org/3';

router.get('/search/:search', async (req, res) => {
    try {
        const { search } = req.params;
        const apiAddress = `${host}/search/movie?include_adult=false&page=1&query=${search}&language=en-US&api_key=${apiKey}`;
        const { body: responseBody } = await getRequest(apiAddress);

        if (responseBody.results.length < 1) {
            return res.status(404).send({ data: res.status });
        }

        return res.status(200).send({ data: responseBody });
    } catch (error) {
        return res.status(400).send({ data: res.status });
    }
});

module.exports = router;
