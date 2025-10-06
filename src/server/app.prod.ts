import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { setupRoutes } from "./routes";

const app = new Hono();

const preservePaths = ["/static", "/favicon.svg", "/api"];

app.use(
    "*",
    serveStatic({
        root: "web",
        rewriteRequestPath(path) {
            if (preservePaths.some((p) => path.startsWith(p))) {
                return path;
            }
            return "/";
        },
    }),
);

setupRoutes(app);

// 不再调用 Deno.serve，Vercel 会自动处理
export default app;
