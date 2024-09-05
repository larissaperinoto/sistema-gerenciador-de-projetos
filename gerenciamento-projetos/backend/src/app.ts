import express, { Express } from "express";
import authRoutes from "./routes/auth.routes";
import projectsRoutes from "./routes/projects.routes";

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use("/api", authRoutes);
    this.app.use("/api", projectsRoutes);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH"
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
