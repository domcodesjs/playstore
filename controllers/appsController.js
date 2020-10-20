const data = require('../data');

exports.sortApps = (req, res) => {
  const { sort, genres } = req.query;
  const genreTypes = [
    'action',
    'puzzle',
    'strategy',
    'casual',
    'arcade',
    'card'
  ];
  let results = data;

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).json({
        success: false,
        message: 'You must provide a valid sort query'
      });
    }
  }

  if (sort === 'app') {
    results = data.sort((a, b) => {
      return a['App'].toLowerCase() > b['App'].toLowerCase()
        ? 1
        : a['App'].toLowerCase() < b['App'].toLowerCase()
        ? -1
        : 0;
    });
  }

  if (sort === 'rating') {
    results = results.sort((a, b) => {
      return a['Rating'] < b['Rating'] ? 1 : a['Rating'] > b['Rating'] ? -1 : 0;
    });
  }

  if (genres) {
    if (!genreTypes.includes(genres.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'You must provide a valid genre querys'
      });
    }

    results = results.filter(
      (app) => app.Genres.toLowerCase() === genres.toLowerCase()
    );
  }

  return res.json({ success: true, results });
};
