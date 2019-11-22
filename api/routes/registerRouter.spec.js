const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");

const testUser = {
  username: "luoji",
  password: "darkforest",
  email: "luoji@gmail.com"
};

beforeEach(() => {
    return db("users").truncate();
  });
  
describe("Register endpoint", () => {
  describe("[POST] /api/register", () => {
    test("Should return a 201 to a properly formatted request", async () => {
      const response = await request(server)
        .post('/api/register')
        .send(testUser)
        .expect(201)
    });
  });
});
