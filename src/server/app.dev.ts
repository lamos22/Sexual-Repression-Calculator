import {Hono} from "hono";
import {setupRoutes} from "./routes";

export const app = new Hono();

setupRoutes(app);
