import express, { json } from "express";
import router from "./routes.js";

const PORT = process.env.APP_PORT || 3000;
const app = express();
app.use(json());

app.use(router);

app.listen(PORT || 3000, () => {
  console.log("The epayco payment service is running at port " + PORT || 3000);
});
