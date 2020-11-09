const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Plant = require('../lib/models/Plant-Model');

describe('Plant routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('Creates a new Plant via POST', () => {
    return request(app)
      .post('/api/v1/plants')
      .send({
        name: 'Ficus Lyrata',
        commonName: 'Fiddle Leaf Fig',
        description: 'Broad fiddle shaped leaves',
        waterNeeds: 'Once a week or when soil is dry about an inch down',
        imageUrl: 'http://placekitten.com/200/300'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Ficus Lyrata',
          commonName: 'Fiddle Leaf Fig',
          description: 'Broad fiddle shaped leaves',
          waterNeeds: 'Once a week or when soil is dry about an inch down',
          imageUrl: 'http://placekitten.com/200/300'
        });
      });
  });

  it('Gets all Plants via GET', async () => {
    const plants = await Promise.all([
      {
        name: 'Ficus Lyrata',
        commonName: 'Fiddle Leaf Fig',
        description: 'Broad fiddle shaped leaves',
        waterNeeds: 'Once a week or when soil is dry about an inch down',
        imageUrl: 'http://placekitten.com/200/300'
      }
    ].map(plant => Plant.insert(plant)));

    return request(app)
      .get('/api/v1/plants')
      .then(res => {
        plants.forEach(plant => {
          expect(res.body).toContainEqual(plant);
        });
      });
  });

  it('gets one plant by id via GET', async () => {
    await Promise.all([
      {
        name: 'Ficus Lyrata',
        commonName: 'Fiddle Leaf Fig',
        description: 'Broad fiddle shaped leaves',
        waterNeeds: 'Once a week or when soil is dry about an inch down',
        imageUrl: 'http://placekitten.com/200/300'
      }
    ].map(plant => Plant.insert(plant)));

    return request(app)
      .get('/api/v1/plants/1')
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Ficus Lyrata',
          commonName: 'Fiddle Leaf Fig',
          description: 'Broad fiddle shaped leaves',
          waterNeeds: 'Once a week or when soil is dry about an inch down',
          imageUrl: 'http://placekitten.com/200/300'
        });
      });
  });
});
