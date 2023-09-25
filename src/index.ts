import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { AuthenticationFactory } from "./modules/authentication/authenticationFactory";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || "3000";
const productName = "Cali's Classification Server V.0001";

// Authorization: Basic ZGVtbzpwQDU1dzByZA==
// Authentication middle-ware
app.use((req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).send("Authorization header is required");
  }
  const { create, getKeys } = AuthenticationFactory();
  const keys = getKeys();
  const authenticators = keys.map((k) => create(k));
  const authenticaton = authenticators.find((a) => a.supports(authorization));
  next();
});

const index = (_: Request, res: Response) => {
  res.send(`${productName}`);
};
app.get("/", index);

app.get("/list", (req: Request, res: Response) => {
  res.send(`${productName}`);
});

const dataSets = (req: Request, res: Response) => {
  res.send(`${productName}`);
};
app.get("/datasets", dataSets);

const server = app.listen(port, () => {
  console.log(`⚡️⚡️${productName} is running at http://localhost:${port}`);
});

export default app;
export { server, index, dataSets };
