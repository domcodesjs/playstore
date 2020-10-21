const app = require('../index');
const { expect } = require('chai');
const supertest = require('supertest');

describe('app module', () => {
  const genreTypes = [
    'action',
    'puzzle',
    'strategy',
    'casual',
    'arcade',
    'card'
  ];

  describe('get apps', () => {
    it('should return a JSON array of all apps', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('results');
        });
    });
  });

  describe('sort apps by app or rating', () => {
    it('should sort apps by rating', () => {
      return supertest(app)
        .get('/apps')
        .query({ sort: 'rating' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('results');
          const { results } = res.body;
          let i = 0;
          let sorted = true;
          while (i < results.length - 1) {
            const current = results[i];
            const next = results[i + 1];
            if (next.Rating > current.Rating) {
              sorted = false;
              break;
            }
            i++;
          }
          expect(sorted).to.be.true;
        });
    });

    it('should sort apps alphabetically', () => {
      return supertest(app)
        .get('/apps')
        .query({ sort: 'app' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('results');
          const { results } = res.body;
          let i = 0;
          let sorted = true;
          while (i < results.length - 1) {
            const current = results[i].App.toLowerCase();
            const next = results[i + 1].App.toLowerCase();
            if (current.localeCompare(next) > 0) {
              sorted = false;
              break;
            }
            i++;
          }
          expect(sorted).to.be.true;
        });
    });
  });

  describe('get apps by genre', () => {
    it('should return a JSON array of apps by genre', () => {
      return supertest(app)
        .get('/apps')
        .query({ genres: 'action' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.haveOwnProperty('results');
          const { results } = res.body;
          let matches = results.every(
            (app) => app.Genres.toLowerCase() === 'action'
          );
          expect(matches).to.be.true;
        });
    });
  });
});
