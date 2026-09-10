import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "NokshaBD Server is running and healthy",
  });
});

export default app;
