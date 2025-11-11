import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import { loadConfig } from "./common/helper/config.helper";
loadConfig();
import errorHandler from "./common/middleware/error-handler.middleware";
import { initDB } from "./services/database.services";
import routes from "./router";
import { IUser } from "./modules/user/user.dto";
import { limiter } from "./common/middleware/ratelimit.middleware";
const port = Number(process.env.port) || 3000;
const app = express();



declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(limiter)

const initApp = async (): Promise<void> => {
  await initDB();
  app.use("/api", routes);
  app.get("/", (req: Request, res: Response) => {
    res.send("ready for backend");
  });
  app.use(errorHandler);
  app;
  http.createServer(app).listen(port, () => {
    console.log(`server is running at port ${port}`);
  });
};

void initApp();
