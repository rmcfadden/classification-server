import app, { server } from "../src/index";
import request from "supertest";
import dotenv from "dotenv";
import { DataPoint } from "../src/models/dataPoint";
import { TextFeature } from "../src/models/textFeature";

import { DataSet } from "../src/models/dataSet"
import { ClassifyDataSetQuery } from "../src/models/classifyDataSetQuery"

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
  const dataSetName = "test123"
  const dataPoints: DataPoint[] = [{ x: 1, y: 2, }, { x: 2, y: 4, }, { x: 4, y: 8 }];
  const pointsDataSet: DataSet = { name: dataSetName, dataTypes: "datapoint", items: dataPoints }

  const { status: addStatus } = await request(app)
    .post("/datasets/")
    .set('Authorization', token)
    .send(JSON.stringify(pointsDataSet))
    .set('Content-type', 'application/json');
  expect(addStatus).toBe(200);

  const { status: getStatus, body } = await request(app)
    .get(`/datasets/name/${dataSetName}/`)
    .set('Authorization', token);
  expect(getStatus).toBe(200);
  const { name, dataTypes }: DataSet = body;
  expect(dataSetName).toBe(name);
  expect(dataTypes).toBe("datapoint");
  expect(JSON.stringify(body)).toBe(JSON.stringify(pointsDataSet));

});

test("classify", async () => {

  console.log("HERE!!!!!!!!!!!!!!!!!!!!");
  const dataSetName = "testText"
  const textFeatures: TextFeature[] = [
    { text: "apple", feature: "fruit" },
    { text: "orange", feature: "fruit" },
    { text: "tamato", feature: "vegetable" },
    { text: "lettuce", feature: "vegetable" },
    { text: "oat", feature: "grain" },
  ];
  const foodDataSet: DataSet = { name: dataSetName, dataTypes: "textFeature", items: textFeatures }

  const classifyQuery: ClassifyDataSetQuery = {
    type: "text",
    dataSet: foodDataSet,
    query: "lettuce"
  }

  const { status, body } = await request(app)
    .post(`/classify`)
    .set('Authorization', token)
    .send(JSON.stringify(classifyQuery))
    .set('Content-type', 'application/json');

  console.log("BODY", body);
  expect(status).toBe(200);

});

afterAll(() => server.close());
