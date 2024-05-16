import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./app/middleware/notFound";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
//parser
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(cookieParser());

//application routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to server",
  });
});

//global error handler
app.use(globalErrorHandler);

//not found routes
app.use(notFound);
export default app;
