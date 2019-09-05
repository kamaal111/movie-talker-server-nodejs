const { Router } = require('express');
const { get: getRequest } = require('superagent');

const router = new Router();

const apiKey = process.env.TMDB_API_KEY;
const host = 'https://api.themoviedb.org/3';

router.get('/search/:search/:page', async (req, res) => {
  try {
    const apiOptions = {
      apiKey,
      adult: false,
      search: req.params.search,
      language: 'en-US',
      page: req.params.params,
    };

    const apiAddress =
      `${host}/search/movie?include_adult=${apiOptions.adult}` +
      `&page=${apiOptions.page}&query=${apiOptions.search}` +
      `&language=en-US&api_key=${apiOptions.apiKey}`;

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
