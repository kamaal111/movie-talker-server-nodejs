const { Router } = require('express');
const { get: getRequest } = require('superagent');

const { apiKey, host } = require('../apiConsts');

const router = new Router();

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

    const results = responseBody.results
      .map(({ original_title, release_date, overview }) => ({
        original_title,
        release_date,
        overview,
      }))
      .filter(({ overview }) => overview !== '');

    const data = {
      results,
      page: responseBody.page,
      totalPages: responseBody.total_pages,
    };

    return res.status(200).send({ data });
  } catch (error) {
    return res.status(400).send({ data: res.status });
  }
});

module.exports = router;
