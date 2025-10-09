The Deno Runtime compiles a TypeScript or JavaScript function into a serverless function powered by Deno, running on Vercel.

⚠️ Version 3 includes breaking changes! ⚠️
Please read the migration guide.

Usage
Your serverless function file is expected to export default the HTTP handler function, and then vercel-deno takes care of invoking that handler function every time an HTTP request is received.

Note: Check out the api directory to see examples of using popular Deno web frameworks with vercel-deno. Feel free to send a pull request to add additional examples!

Example
Create a file called api/hello.ts with the following contents:

export default (req: Request) => {
  return new Response(`Hello, from Deno v${Deno.version.deno}!`);
};
Next, define the vercel-deno runtime within the "functions" object in your vercel.json file:

{
  "functions": {
    "api/**/*.[jt]s": { "runtime": "vercel-deno@3.1.0" }
  }
}
Demo: https://vercel-deno.vercel.app/api/hello

Configuration
To configure which flags are passed to deno run, a shebang needs to be defined in the entrypoint of the Serverless Function containing the flags that will be used.

For example, to set the window.location object, and use a specific tsconfig file:

#!/usr/bin/env deno run --location http://example.com/path --config other-tsconfig.json

export default async () => new Response(`Location is ${window.location.href}!`);
There are also a few flags that can be used that are specific to vercel-deno:

--version - Specify a specific version of Deno to use (can be any valid Deno release tag — e.g. v1.2.3).
--include-files - Glob pattern of static files to include within the Serverless Function. Can be specified more than once.
Endpoint-specific Environment Variables
It's also possible to specify environment variables that will apply only to a specific API endpoint by utilizing the shebang. Just place the environment variables before the deno command in the shebang. For example:

#!/usr/bin/env FOO=bar ANOTHER="spaces work too" deno run
In this example, the FOO environment variable will be set to "bar" and ANOTHER will be set to "spaces work too" for only this endpoint.

Dynamic Imports
By default, dynamic imports (using the import() function during runtime) will fail. For most use-cases, this is fine since this feature is only necessary for rare use-cases.

However, when dynamic imports are required for your endpoint, the DENO_DIR environment variable will need to be set to "/tmp". This is required because the file system is read-only, within the Serverless Function runtime environment, except for the "/tmp" dir. Because dynamic imports will require compilation at runtime, the deno cache directory needs to be writable.

The recommended way of enabling this is to add an environment variable to the endpoint's shebang. For example:

#!/usr/bin/env DENO_DIR=/tmp deno run

export default async () => {
  const mod = await import('http://example.com/mod.ts');
  return new Response(mod.default.doThing());
};
Development
The vercel dev command is supported on Windows, macOS, and Linux:

Vercel CLI v19.1.0 or newer is required.
Uses the deno binary installed on the system (does not download deno).
Specifying a specific version of Deno via --version flag is ignored.


Community runtimes
If you would like to use a language that Vercel does not support by default, you can use a community runtime by setting the functions property in vercel.json. For more information on configuring other runtimes, see Configuring your function runtime.

The following community runtimes are recommended by Vercel:

Runtime Runtime Module  Docs
Bash  vercel-bash https://github.com/importpw/vercel-bash
Deno  vercel-deno https://github.com/vercel-community/deno
PHP vercel-php  https://github.com/vercel-community/php
Rust  vercel-rust https://github.com/vercel-community/rust




请你根据以上文档，用中文回答我应该如何将deno后端的react应用在vercel上部署。


环境要求
Node.js >= 22.0.0
现代浏览器支持

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

🏗️ 技术架构
前端技术栈
框架: React 19 + TypeScript
路由: React Router v7
样式: Tailwind CSS + shadcn/ui
状态管理: React Query + React Hooks
图表: Recharts
表单: React Hook Form + Zod
图标: Lucide React
后端技术栈
运行时: Deno Edge Function
框架: Hono.js + zValidator
数据验证: Zod
构建工具: Rsbuild


📁 项目结构
public/favicon.svg
src/
├── components/          # React组件
│   ├── assessment/      # 评估相关组件
│   ├── common/         # 通用组件
│   └── ui/             # shadcn/ui组件
├── pages/              # 页面组件
├── lib/                # 工具库
│   ├── scales/         # 量表定义
│   ├── calculator/     # 计算引擎
│   └── storage/        # 存储管理
├── types/              # TypeScript类型
├── server/             # 服务端代码
└── styles/             # 样式文件
components.json
eslint.config.js
index.html
package.json
postcss.config.js
rsbuild.config.server.ts
rsbuild.config.ts
tailwind.config.ts
tsconfig.app.json
tsconfig.base.json
tsconfig.json
tsconfig.node.json

对于以上网页应用，我应该如何部署在Vercel上？
请你尽可能保持以上源代码目录结构不变，进行最小修改。添加例如vercel.json文件来实现。
