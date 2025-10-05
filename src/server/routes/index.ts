import {Hono} from "hono";

export function setupRoutes(app: Hono) {
  const routes = new Hono();
  // 预留API路由配置位置
  // 当前项目使用100%本地数据处理，无需服务器API

  const entry = app.route("/api", routes);

  return entry;
}

export type AppType = ReturnType<typeof setupRoutes>;
