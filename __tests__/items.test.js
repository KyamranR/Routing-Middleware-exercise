const request = require("supertest");
const app = require("../index");
let items = require("../fakeDb");

beforeEach(() => {
  items.length = 0;
  items.push({ name: "popsicle", price: 1.45 });
});

describe("GET /items", () => {
  test("Gets a list of items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
  });
});

describe("POST /items", () => {
  test("Adds a new item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "cheerios", price: 3.4 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "cheerios", price: 3.4 } });
  });
});

describe("GET /items/:name", () => {
  test("Gets a single item by name", async () => {
    const res = await request(app).get("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
  });

  test("Responds with 404 if item not found", async () => {
    const res = await request(app).get("/items/nonexistent");
    expect(res.statusCode).toBe(404);
  });
});

describe("PATCH /items/:name", () => {
  test("Updates an item", async () => {
    const res = await request(app)
      .patch("/items/popsicle")
      .send({ name: "new popsicle", price: 2.45 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      updated: { name: "new popsicle", price: 2.45 },
    });
  });

  test("Responds with 404 if item not found", async () => {
    const res = await request(app)
      .patch("/items/nonexistent")
      .send({ name: "nothing", price: 2.45 });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Deletes an item", async () => {
    const res = await request(app).delete("/items/popsicle");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
    expect(items.length).toBe(0);
  });

  test("Responds with 404 if item not found", async () => {
    const res = await request(app).delete("/items/nonexistent");
    expect(res.statusCode).toBe(404);
  });
});
