// Import librarie and app.js
const request = require('supertest');
const app = require('../app');

// Creation of a group of tests for route GET /faq
describe('GET /faq', () => {
    // Creation of a unitary test
    it('should return the list of FAQs', async () => {
        // Send a GET request to the route /faq 
        const res = await request(app).get('/faq');

        // Test if the HTTP code received is 200
        expect(res.statusCode).toBe(200);

        // Checks that the 'FAQ' property exists in the response body
        expect(res.body.FAQ).toBeDefined();

        // Verifies that the first item in the 'FAQ' array has the expected question
        expect(res.body.FAQ[0].question).toBe('🐕 Mon animal s’est fait mordre par un autre animal, que faire ?');
    });
});
