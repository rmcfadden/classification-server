import app, { server } from "../src/index";
import request from "supertest";
import dotenv from "dotenv";
import { DataPoint } from "../src/types/dataPoint";
import { TextLabel } from "../src/types/textLabel";
import { DataPointLabel } from "../src/types/dataPointLabel";

import { DataSet } from "../src/types/dataSet";
import { ClassifyDataSetQuery } from "../src/types/classifyDataSetQuery";
import { LabelPredictionResult } from "../src/types/labelPredictionResult";
import { ImageLabel } from "../src/types/imageLabel";
import { NumericalPredictionResult } from "../src/types/numericalPredictionResult";
import { NDDataPointLabel } from "../src/types/nDDataPointLabel";

dotenv.config();

const token =
    "Basic " +
    Buffer.from(`${process.env.adminUser}:${process.env.adminPassword}`).toString("base64");

test("index", async () => {
    const { status, text } = await request(app).get("/").set("Authorization", token);
    expect(status).toBe(200);
    expect(text).toMatch(/^Cali's Classification Server/);
});

test("datasets", async () => {
    const dataSetName = "test123";
    const dataPoints: DataPoint[] = [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 4, y: 8 },
    ];
    const pointsDataSet: DataSet = {
        name: dataSetName,
        dataTypes: "datapoint",
        items: dataPoints,
    };
    const { status: addStatus } = await request(app)
        .post("/datasets/")
        .set("Authorization", token)
        .send(JSON.stringify(pointsDataSet))
        .set("Content-type", "application/json");
    expect(addStatus).toBe(200);
    const { status: getStatus, body } = await request(app)
        .get(`/datasets/name/${dataSetName}/`)
        .set("Authorization", token);
    expect(getStatus).toBe(200);
    const { name, dataTypes }: DataSet = body;
    expect(dataSetName).toBe(name);
    expect(dataTypes).toBe("datapoint");
    expect(JSON.stringify(body)).toBe(JSON.stringify(pointsDataSet));
});

test("classify dataPoint labels", async () => {
    const dataSetName = "testDataPoints";
    const dataPointLabels: DataPointLabel[] = [
        { x: 0, y: 0, label: "fruit" },
        { x: 1, y: 1, label: "fruit" },
        { x: 3, y: 3, label: "vegetable" },
        { x: 4, y: 4, label: "vegetable" },
        { x: -2, y: -2, label: "grain" },
    ];
    const foodDataSet: DataSet = {
        name: dataSetName,
        dataTypes: "dataPointLabel",
        items: dataPointLabels,
    };
    const classifyQuery: ClassifyDataSetQuery = {
        type: "dataPointLabel",
        dataSet: foodDataSet,
        text: ".75,.80",
    };
    const { status, body } = await request(app)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");
    expect(status).toBe(200);
    const { predictions }: LabelPredictionResult = body;
    const [{ label, probability }] = predictions;
    expect(label).toBe("fruit");
    expect(probability).toBe(100);
    expect(status).toBe(200);
});

test("classify nDDataPoints", async () => {
    const dataSetName = "testDataPoints";
    const dataPoints: NDDataPointLabel[] = [
        { values: [0, 0], label: "fruit" },
        { values: [1, 1], label: "fruit" },
        { values: [3, 3], label: "vegetable" },
        { values: [4, 4], label: "vegetable" },
        { values: [-2, -2], label: "grain" },
    ];
    const pointsDataSet: DataSet = {
        name: dataSetName,
        dataTypes: "nDDataPoint",
        items: dataPoints,
    };
    const classifyQuery: ClassifyDataSetQuery = {
        type: "nDDataPointLabel",
        dataSet: pointsDataSet,
        text: ".75,.80",
    };
    const { status, body } = await request(app)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");

    const { predictions }: LabelPredictionResult = body;
    const [{ label, probability }] = predictions;
    expect(label).toBe("fruit");
    expect(probability).toBe(100);
    expect(status).toBe(200);
});

test("classify dataPoints", async () => {
    const dataSetName = "testDataPoints";
    const dataPoints: DataPoint[] = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: -2, y: -2 },
    ];
    const pointsDataSet: DataSet = {
        name: dataSetName,
        dataTypes: "dataPoint",
        items: dataPoints,
    };
    const classifyQuery: ClassifyDataSetQuery = {
        type: "numerical",
        dataSet: pointsDataSet,
        text: "1",
    };
    const { status, body } = await request(app)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");
    expect(status).toBe(200);
    const { result }: NumericalPredictionResult = body;
    expect(result).toBe(1);
});

test("classify text", async () => {
    const dataSetName = "testText";
    const textLabels: TextLabel[] = [
        { text: "apple", label: "fruit" },
        { text: "orange", label: "fruit" },
        { text: "tamato", label: "vegetable" },
        { text: "lettuce", label: "vegetable" },
        { text: "oat", label: "grain" },
    ];
    const foodDataSet: DataSet = {
        name: dataSetName,
        dataTypes: "textLabel",
        items: textLabels,
    };
    const classifyQuery: ClassifyDataSetQuery = {
        type: "text",
        dataSet: foodDataSet,
        text: "lettuce",
    };
    const { status, body } = await request(app)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");

    expect(status).toBe(200);
    const { predictions }: LabelPredictionResult = body;
    const [{ label, probability }] = predictions;
    expect(label).toBe("vegetable");
    expect(probability).toBe(100);
    expect(status).toBe(200);
});

test("classify image", async () => {
    const dataSetName = "testText";
    const textLabels: ImageLabel[] = [
        { image: "=!@#!#$%AABADF", label: "fruit" },
        { image: "ASDFAS123BADA@$46", label: "fruit" },
        { image: "123#$2342341aba412", label: "vegetable" },
    ];
    const foodDataSet: DataSet = {
        name: dataSetName,
        dataTypes: "imageLabel",
        items: textLabels,
    };
    const classifyQuery: ClassifyDataSetQuery = {
        type: "image",
        dataSet: foodDataSet,
        text: "123#$2342341aba412",
    };
    const { status, body } = await request(app)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");
    expect(status).toBe(200);
    const { predictions }: LabelPredictionResult = body;
    const [{ label, probability }] = predictions;
    expect(label).toBe("vegetable");
    expect(probability).toBe(100);
    expect(status).toBe(200);
});

test("modules", async () => {
    const { status, body } = await request(app)
        .get(`/modules`)
        .set("Authorization", token)
        .set("Content-type", "application/json");

    console.log("BODY", body);
    expect(status).toBe(200);
});

afterAll(() => server.close());
