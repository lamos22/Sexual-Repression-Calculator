import {Hono} from "hono";
import {serveStatic} from "hono/deno";
import {setupRoutes} from "./routes";

const app = new Hono();

const presevePaths = ["/static", "/favicon.svg", "/api"];

app.use(
  "*",
  serveStatic({
    root: `web`,
    rewriteRequestPath(path) {
      if (presevePaths.some((p) => path.startsWith(p))) {
        return path;
      }
      return "/";
    },
  }),
);

setupRoutes(app);

Deno.serve(app.fetch);
