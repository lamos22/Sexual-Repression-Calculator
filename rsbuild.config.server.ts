import { defineConfig } from "@rsbuild/core";
import { resolve } from "path";

export default defineConfig({
    source: {
        entry: {
            server: "./src/server/app.prod.ts",
        },
    },
    output: {
        target: "node",       // Node.js 运行时
        format: "cjs",        // 强制输出 CommonJS，Vercel Node 可以用
        cleanDistPath: false,
        filename: {
            js: "[name].cjs",
        },
        legalComments: "none",
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
