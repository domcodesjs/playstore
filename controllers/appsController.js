const data = require('../data');

exports.sortApps = (req, res) => {
  const { sort, genres } = req.query;
  let results = data;

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).json({
        success: false,
        message: 'You must provide a valid sort'
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
    if (!checkGenre(genres.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'You must provide a valid genre'
      });
    }

    results = results.filter((app) => {
      return app.Genres.toLowerCase() === genres.toLowerCase();
    });
  }

  return res.json({ success: true, results });
};

function checkGenre(genre) {
  return ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(
    genre
  );
}
