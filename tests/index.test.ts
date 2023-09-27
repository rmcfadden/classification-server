import app, { server } from "../src/index";
import request from "supertest";
import dotenv from "dotenv";

dotenv.config();

const token = 'Basic ' + Buffer.from(`${process.env.adminUser}:${process.env.adminPassword}`).toString('base64')

test("index", async () => {
  const { status, text } = await request(app)
    .get("/")
    .set('Authorization', token);
    expect(status).toBe(200);
  expect(text).toMatch(/^Cali's Classification Server/);
});

test("datasets", async () => {
  const { status, text } = await request(app)
    .post("/datasets/")
    .set('Authorization', token);
  expect(status).toBe(200);
  expect(text).toMatch(/^Cali's Classification Server/);
});

afterAll(() => server.close());
