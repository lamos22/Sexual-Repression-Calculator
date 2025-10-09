import { Hono } from "hono";
import { setupRoutes } from "./routes";

const app = new Hono();

setupRoutes(app);

export default app;
