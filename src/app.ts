import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { route } from "./modules/route.js";
import { ApiResponse } from "./helper/ApiResponse.js";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "NokshaBD Server is running and healthy",
  });
});

app.use(route);

app.use((req: Request, res: Response) => {
  ApiResponse.notFound(res);
});

export default app;
