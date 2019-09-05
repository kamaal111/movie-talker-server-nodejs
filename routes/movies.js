const { Router } = require('express');
const { get: getRequest } = require('superagent');

const { apiKey, host } = require('../apiConsts');

const router = new Router();

router.get('/search/:search/:page', async (req, res) => {
  try {
    const apiOptions = {
      apiKey,
      adult: false,
      language: 'en-US',
      search: req.params.search,
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

    const page = responseBody.page;
    const totalPages = responseBody.total_pages;
    const data = responseBody.results.reduce(
      (acc, result) => {
        if (result.overview === '') return acc;

        return {
          ...acc,
          results: [
            ...acc.results,
            {
              original_title: result.original_title,
              release_date: result.original_title,
              overview: result.overview,
            },
          ],
        };
      },
      { page, totalPages, results: [] }
    );

    return res.status(200).send({ data });
  } catch (error) {
    return res.status(400).send({ data: res.status });
  }
});

module.exports = router;
