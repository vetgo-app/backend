// Import de la librairie supertest qui permet de faire des requêtes HTTP pour tester une API
const request = require('supertest');

// Import de app.js
const app = require('../app');

// Définition d'un groupe de tests pour la route GET /users
describe('GET /users', () => {
    // Définition d'un test unitaire
    it('should return the list of users', async () => {

        // Envoi d'une requête GET vers la route /users de l'application
        const res = await request(app).get('/users');

        // Test si le code HTTP reçu est 200
        expect(res.statusCode).toBe(200);

        // Test que le champ "result" dans la réponse est bien true
        expect(res.body.result).toBe(true);

        // Test que "data" est bien un tableau 
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
