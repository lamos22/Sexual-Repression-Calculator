import { Hono } from "hono";
import { setupRoutes } from "./routes.ts";

const app = new Hono();

setupRoutes(app);

export default app;
