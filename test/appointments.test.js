// Import de la librairie supertest qui permet de faire des requêtes HTTP pour tester une API
const request = require("supertest");

// Import de app.js (pour le fonctionnement des routes)
const app = require("../app");

// Définition d'un groupe de tests pour la route GET /myRdv
describe("GET /myRdv/:token", () => {

    // Définition d'un test unitaire
    it("should return appointments for a valid token", async () => {

        // Envoi d'une requête GET vers la route /myRdv avec un token factice ("test-token") d'un utilisateur en BDD
        const response = await request(app).get("/appointments/myRdv/test-token");
        
        // Test si le code HTTP reçu est 200
        expect(response.statusCode).toBe(200);

        // Test si la réponse contient bien une propriété "result"
        expect(response.body).toHaveProperty("result");
    });
});

//pour lancer le test = > yarn jest