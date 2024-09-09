import express, { Express } from "express";
import cors from "cors";
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
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
