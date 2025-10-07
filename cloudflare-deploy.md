# Cloudflare Pages 部署指南

## 部署配置

### 构建设置
- **构建命令**: `npm run cf:deploy`
- **输出目录**: `dist`

### 环境变量
此应用不需要环境变量，所有数据都在客户端处理。

## 部署步骤

1. 将代码推送到 GitHub 仓库
2. 在 Cloudflare Dashboard 中创建 Pages 应用
3. 连接 GitHub 仓库
4. 配置构建设置：
   - 构建命令: `npm run cf:deploy`
   - 输出目录: `dist`
5. 点击部署

## 注意事项

- 此应用是纯静态的 React 应用，所有数据处理都在客户端进行
- 不需要服务器端 API，所有功能都可以在浏览器中完成
- 应用使用 localStorage 存储用户数据，数据不会上传到服务器
- 使用 `--legacy-peer-deps` 参数解决依赖冲突问题