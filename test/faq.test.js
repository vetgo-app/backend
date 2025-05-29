// Import librarie and app.js
const request = require('supertest');
const app = require('../app');

describe('GET /faq', () => {
  it('should return the list of FAQs', async () => {
    const res = await request(app).get('/faq');

    expect(res.statusCode).toBe(200);
    expect(res.body.FAQ).toBeDefined();
    expect(res.body.FAQ[0].question).toBe('🐕 Mon animal s’est fait mordre par un autre animal, que faire ?');
  });
});
