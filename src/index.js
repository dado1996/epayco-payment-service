import express, { json } from "express";
import router from "./routes/routes.js";
import cors from "cors";

const PORT = process.env.APP_PORT || 3000; // Get the port from the environment variable
const app = express(); // Initialize the app
app.use(json({ limit: "25kb" })); // The payload can't be bigger than 25 kb
app.use(
  cors({
    exposedHeaders: ["GET, POST"],
    origin: process.env.CLIENT_SERVICE_URL || "http://localhost:3001/",
    optionsSuccessStatus: 200,
  })
);

app.use("/api", router); // Added "/api" prefix as it is standard for all APIs

app.listen(PORT || 3000, () => {
  console.log("The epayco payment service is running at port " + PORT || 3000);
});
