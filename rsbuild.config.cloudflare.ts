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
      root: "dist",
    },
    legalComments: "none",
    copy: [
      { from: "./redirect.html", to: "redirect.html" },  // 确保 redirect.html 被复制到输出目录
      { from: "./functions/_middleware.js", to: "_middleware.js" },  // 确保全局 _middleware.js 被复制到输出目录
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});