const request = require('supertest');
const app = require('../app');

describe('GET /products', () => {
    it('should return a list of products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});
