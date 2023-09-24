import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT  || 3000;
const productName = "Classification Server";

const index =  (req: Request, res: Response) => {
  res.send(`${productName}`);
}
app.get('/',index);

app.get('/list', (req: Request, res: Response) => {
  res.send(`${productName}`);
});


app.get('/classify', (req: Request, res: Response) => {
  res.send(`${productName}`);
});

app.get('/datasets', (req: Request, res: Response) => {
  res.send(`${productName}`);
});


app.listen(port, () => {
  console.log(`⚡️⚡️${productName} is running at http://localhost:${port}`);
});

export {index};