#!/usr/bin/env DENO_DIR=/tmp deno run --allow-net --allow-env --allow-read

// api/server.ts
// ✅ Hono + Zod + 跨域 + JSON API 示例

import { Hono } from 'https://deno.land/x/hono@v4.4.3/mod.ts'
import { cors } from 'https://deno.land/x/hono@v4.4.3/middleware/cors/index.ts'
import { zValidator } from 'https://deno.land/x/hono_zod_validator@v0.2.1/mod.ts'
import { z } from 'https://deno.land/x/zod@v3.23.8/mod.ts'

const app = new Hono()

// 全局 CORS 中间件：允许前端调用 API
app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}))

// 健康检查
app.get('/', (c) => c.text(`✅ Deno Edge Function is running! v${Deno.version.deno}`))

// 示例：JSON 回显
app.post('/api/echo', zValidator('json', z.object({ name: z.string() })), (c) => {
    const { name } = c.req.valid('json')
    return c.json({ message: `Hello, ${name}!`, time: new Date().toISOString() })
})

// 示例：读取环境变量
app.get('/api/env', (c) => {
    const secret = Deno.env.get('MY_SECRET') ?? '(not set)'
    return c.json({ env: secret })
})

export default app
