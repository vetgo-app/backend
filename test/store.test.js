// Import de la librairie supertest qui permet de faire des requêtes HTTP pour tester une API
const request = require("supertest");

// Import de app.js
const app = require('../app');

// Définition d'un groupe de tests pour la route GET /stores
describe("GET /stores", () => {

    // Définition d'un test unitaire
    it("should return result: true and data as array when no storeId", async () => {

        // Envoi d'une requête GET vers la route /store de l'application
        const response = await request(app).get("/store");

        // Test si le code HTTP reçu est 200
        expect(response.status).toBe(200);

        // Test si la réponse JSON est bien true
        expect(response.body.result).toBe(true);

        // Test si "data" est un tableau
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});
