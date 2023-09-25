import app, { server } from "../src/index";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.adminUser);
console.log(process.env.adminPassword);

test("index", async () => {
  const { status, text } = await request(app).get("/");
  expect(status).toBe(200);
  expect(text).toMatch(/^Cali's Classification Server/);
});

test("datasets", async () => {
  const { status, text } = await request(app).post("/datasets/");
  expect(status).toBe(200);
  expect(text).toMatch(/^Cali's Classification Server/);
});

afterAll(() => server.close());
