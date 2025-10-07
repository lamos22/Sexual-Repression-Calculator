// rsbuild.config.ts
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [pluginReact()],
    html: {
        template: "./index.html",
    },
    source: {
        entry: {
            index: "./src/main.tsx",
        },
    },
    output: {
        distPath: {
            root: "dist/web",
        },
        legalComments: "none",
    },
    dev: {
        watchFiles: {
            paths: ["./src/server"],
            type: "reload-server",
        },
        setupMiddlewares: [
            (middlewares) => {
                // 本地开发时将 /api 请求代理到 Hono 应用
                const { app } = require("./src/server/app.dev");
                const { getRequestListener } = require("@hono/node-server");
                middlewares.unshift((req, res, next) => {
                    if (req.url?.startsWith("/api")) {
                        const listener = getRequestListener(app.fetch);
                        listener(req, res);
                    } else {
                        next();
                    }
                });
            },
        ],
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
