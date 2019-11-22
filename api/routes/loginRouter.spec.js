const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");

beforeEach(() => {
    return db.seed.run();
})

describe('/api/login endpoint', () => {
    describe('[POST] /api/login', () => {
        test('responds with a 201 to a properly formatted POST from an existing user', async () => {
            const testUser = await db('users').where({ username: 'Dom' });
            const response = await request(server)
                .post('/api/login')
                .send({ username: 'Dom', password: 'dom123'})
                .expect(200)
        })
    })
})