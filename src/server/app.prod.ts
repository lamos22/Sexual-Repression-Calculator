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
    })
);

setupRoutes(app);

// ✅ 直接导出 fetch handler
export default app.fetch;
