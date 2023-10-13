"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("../src/index"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = "Basic " +
    Buffer.from(`${process.env.adminUser}:${process.env.adminPassword}`).toString("base64");
test("index", async () => {
    const { status, text } = await (0, supertest_1.default)(index_1.default).get("/").set("Authorization", token);
    expect(status).toBe(200);
    expect(text).toMatch(/^Cali's Classification Server/);
});
test("datasets", async () => {
    const dataSetName = "test123";
    const dataPoints = [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 4, y: 8 },
    ];
    const pointsDataSet = {
        name: dataSetName,
        dataTypes: "datapoint",
        items: dataPoints,
    };
    const { status: addStatus } = await (0, supertest_1.default)(index_1.default)
        .post("/datasets/")
        .set("Authorization", token)
        .send(JSON.stringify(pointsDataSet))
        .set("Content-type", "application/json");
    expect(addStatus).toBe(200);
    const { status: getStatus, body } = await (0, supertest_1.default)(index_1.default)
        .get(`/datasets/name/${dataSetName}/`)
        .set("Authorization", token);
    expect(getStatus).toBe(200);
    const { name, dataTypes } = body;
    expect(dataSetName).toBe(name);
    expect(dataTypes).toBe("datapoint");
    expect(JSON.stringify(body)).toBe(JSON.stringify(pointsDataSet));
});
test("classify dataPoint features", async () => {
    const dataSetName = "testDataPoints";
    const dataPointFeatures = [
        { x: 0, y: 0, feature: "fruit" },
        { x: 1, y: 1, feature: "fruit" },
        { x: 3, y: 3, feature: "vegetable" },
        { x: 4, y: 4, feature: "vegetable" },
        { x: -2, y: -2, feature: "grain" },
    ];
    const foodDataSet = {
        name: dataSetName,
        dataTypes: "dataPointFeature",
        items: dataPointFeatures,
    };
    const classifyQuery = {
        type: "dataPointFeature",
        dataSet: foodDataSet,
        text: ".75,.80",
    };
    const { status, body } = await (0, supertest_1.default)(index_1.default)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");
    expect(status).toBe(200);
    const { predictions } = body;
    const [{ feature, probability }] = predictions;
    expect(feature).toBe("fruit");
    expect(probability).toBe(100);
    expect(status).toBe(200);
});
test("classify dataPoints", async () => {
    const dataSetName = "testDataPoints";
    const dataPoints = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: -2, y: -2 },
    ];
    const pointsDataSet = {
        name: dataSetName,
        dataTypes: "dataPoint",
        items: dataPoints,
    };
    const classifyQuery = {
        type: "numerical",
        dataSet: pointsDataSet,
        text: "1",
    };
    const { status, body } = await (0, supertest_1.default)(index_1.default)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");
    expect(status).toBe(200);
    const { result } = body;
    expect(result).toBe(1);
});
test("classify text", async () => {
    const dataSetName = "testText";
    const textFeatures = [
        { text: "apple", feature: "fruit" },
        { text: "orange", feature: "fruit" },
        { text: "tamato", feature: "vegetable" },
        { text: "lettuce", feature: "vegetable" },
        { text: "oat", feature: "grain" },
    ];
    const foodDataSet = {
        name: dataSetName,
        dataTypes: "textFeature",
        items: textFeatures,
    };
    const classifyQuery = {
        type: "text",
        dataSet: foodDataSet,
        text: "lettuce",
    };
    const { status, body } = await (0, supertest_1.default)(index_1.default)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");
    console.log("BODY", body);
    expect(status).toBe(200);
    const { predictions } = body;
    const [{ feature, probability }] = predictions;
    expect(feature).toBe("vegetable");
    expect(probability).toBe(100);
    expect(status).toBe(200);
});
test("classify image", async () => {
    const dataSetName = "testText";
    const textFeatures = [
        { image: "=!@#!#$%AABADF", feature: "fruit" },
        { image: "ASDFAS123BADA@$46", feature: "fruit" },
        { image: "123#$2342341aba412", feature: "vegetable" },
    ];
    const foodDataSet = {
        name: dataSetName,
        dataTypes: "imageFeature",
        items: textFeatures,
    };
    const classifyQuery = {
        type: "image",
        dataSet: foodDataSet,
        text: "123#$2342341aba412",
    };
    const { status, body } = await (0, supertest_1.default)(index_1.default)
        .post(`/classify`)
        .set("Authorization", token)
        .send(JSON.stringify(classifyQuery))
        .set("Content-type", "application/json");
    expect(status).toBe(200);
    const { predictions } = body;
    const [{ feature, probability }] = predictions;
    expect(feature).toBe("vegetable");
    expect(probability).toBe(100);
    expect(status).toBe(200);
});
afterAll(() => index_1.server.close());
