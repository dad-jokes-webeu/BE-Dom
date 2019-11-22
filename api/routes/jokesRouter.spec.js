const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");

beforeEach(() => {
    return db.seed.run();
})

describe("/api/jokes endpoint", () => {

  describe("[GET] request to /api/jokes", () => {

    test("Returns list of public jokes if user is not logged in", async () => {
      const response = await request(server).get("/api/jokes");
      expect(response.body.map(el => el.public === 1)).toEqual([true]);
    });

    test("Returns list of all jokes if user is logged in", async () => {
      const response = await request(server)
        .get("/api/jokes")
        .set(
          "authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkRvbSIsImVtYWlsIjoiZG9tZWNjbGVzdG9uQGdtYWlsLmNvbSIsImlhdCI6MTU3NDM5NzkyNCwiZXhwIjoxNTc0NDg0MzI0fQ._nYGcyUliChz5wbd4vk-ftS43ohkon1uq-sU48CKWYw"
        )
        .expect(200);
      expect(response.body.length).toBeGreaterThan(1);
    });
  })

  describe("[POST] request to /api/jokes", () => {
    test("User can add a new joke when logged in", async () => {
        const response = await request(server)
        .post('/api/jokes')
        .set(
            "authorization",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkRvbSIsImVtYWlsIjoiZG9tZWNjbGVzdG9uQGdtYWlsLmNvbSIsImlhdCI6MTU3NDM5NzkyNCwiZXhwIjoxNTc0NDg0MzI0fQ._nYGcyUliChz5wbd4vk-ftS43ohkon1uq-sU48CKWYw"
          )
        .send({ user_id: 1, setup: "testsetup", punchline: "testpunchline", public: 1 })
        .expect(200)
    })
  })

  describe("[PUT] request to /api/jokes", () => {
      test("User can modify an existing joke when logged in", async () => {
          const joke1 = await db('jokes').where({ id: 1 });
          const response = await request(server)
            .put('/api/jokes/1')
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkRvbSIsImVtYWlsIjoiZG9tZWNjbGVzdG9uQGdtYWlsLmNvbSIsImlhdCI6MTU3NDM5NzkyNCwiZXhwIjoxNTc0NDg0MzI0fQ._nYGcyUliChz5wbd4vk-ftS43ohkon1uq-sU48CKWYw"
              )
            .send({ user_id: 1, setup: "testputrequest", punchline: "testputpunchline", public: 1 })
          const modifiedJoke1 = await db('jokes').where({ id: 1 });
          expect(joke1).not.toEqual(modifiedJoke1);
      })
  })

  describe("[DELETE] request to /api/jokes", () => {
      test("User can delete an existing joke when logged in", async () => {
          const response = await request(server)
            .delete('/api/jokes/1')
            .set(
                "authorization",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6IkRvbSIsImVtYWlsIjoiZG9tZWNjbGVzdG9uQGdtYWlsLmNvbSIsImlhdCI6MTU3NDM5NzkyNCwiZXhwIjoxNTc0NDg0MzI0fQ._nYGcyUliChz5wbd4vk-ftS43ohkon1uq-sU48CKWYw"
                )
          const joke1 = await db('jokes').where({ id: 1});
          expect(joke1.length).toBe(0);
      })
  })
});
