import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { AuthenticationFactory } from "./modules/authentication/authenticationFactory";
import { AuthenticationBase } from "./modules/authentication/authenticationBase";
import { DataSetsFactory } from "./modules/dataSets/dataSetsFactory";
import { DataSet } from "./types/dataSet";
import { ClassifyQuery } from "./types/classifyQuery";
import { ClassifiersFactory } from "./modules/classifiers/classifiersFactory";
import { AsyncErrorHandler } from "./core/asyncErrorHandler";
import { getModules } from "./modules/index";
import { PlugionLoader } from "./pluginLoader";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || "3000";
const productName = "Cali's Classification Server V.0001";

// Authentication middle-ware
app.use(express.json());

app.use(async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).send("Authorization header is required");
    const { create, getKeys } = AuthenticationFactory();
    const keys = getKeys();
    const authenticators = keys.map((k) => create(k));
    const authenticator = authenticators.find(
        async (a: AuthenticationBase) => await a.supports(authorization)
    );
    if (!authenticator) return res.status(400).send("Cannot find an authenticator");
    await authenticator.authenticate(authorization);
    next();
});

const index = (_: Request, res: Response) => {
    res.send(`${productName}`);
};
app.get("/", index);

const getDataSet = async (req: Request, res: Response) => {
    const name = req.params["name"];
    const dataSetsModule = DataSetsFactory().create("memory");
    const dataSet = await dataSetsModule.get(name);
    res.send(dataSet);
};
app.get("/datasets/name/:name", getDataSet);

const addDataSet = async (req: Request, res: Response) => {
    const dataSet = req.body as DataSet;
    const dataSetsModule = DataSetsFactory().create("memory");
    await dataSetsModule.add(dataSet);
    res.send(dataSet);
};
app.post("/datasets", addDataSet);

const classify = AsyncErrorHandler(async (req: Request, res: Response) => {
    const query = req.body as ClassifyQuery;
    if (!query.type) throw new Error("type cannot be empty");
    const classifier = ClassifiersFactory().create(query.type);
    const response = await classifier.classify(query);
    res.send(response);
});
app.post("/classify", classify);

const modules = AsyncErrorHandler(async (_: Request, res: Response) => {
    const currentModules = getModules();
    res.send(currentModules);
});
app.get("/modules", modules);

const server = app.listen(port, async () => {
    console.log(`⚡️⚡️${productName} is running at http://localhost:${port}`);
    const { load } = PlugionLoader();
    const shouldLoadPlugins = app.get("loadPlugins") !== "false";
    shouldLoadPlugins && (await load());
    !shouldLoadPlugins &&
        console.log("Ignoring loading plugins because loadingPlugins is set to false");
});

app.use((err: Error, _: Request, res: Response, _n: NextFunction) => {
    const error = err instanceof Error ? (err as Error).message : (err as string);
    return res.status(500).send({ errors: [error] });
});

export default app;
export { server, index, getDataSet, addDataSet };
