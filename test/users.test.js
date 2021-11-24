const assert = require("assert");
const request = require("supertest");
const server = require("../src/server");

describe("/users", () => {
  let user = null;

  it("get user list empty", (done) => {
    request(server).get("/users").expect(200, [], done);
  });

  it("create user", (done) => {
    request(server)
      .post("/users")
      .send({ name: "Created" })
      .set("Accept", "application/json")
      .expect((res) => {
        assert(res.body.name, "Created");
        user = res.body;
      })
      .expect(201, done);
  });

  it("get user by id", (done) => {
    request(server)
      .get(`/users/${user.id}`)
      .expect(200, user, done);
  });

  it("get user list", (done) => {
    request(server).get("/users").expect(200, [user], done);
  });

  it("update user", (done) => {
    request(server)
      .put(`/users/${user.id}`)
      .send({ ...user, name: "Updated" })
      .set("Accept", "application/json")
      .expect((res) => {
        assert(res.body.name, "Updated");
        user = res.body;
      })
      .expect(200, done);
  });

  it("delete user", (done) => {
    request(server)
      .delete(`/users/${user.id}`)
      .expect(204, done);
  });

  it("get user list empty", (done) => {
    request(server).get("/users").expect(200, [], done);
  });
});
