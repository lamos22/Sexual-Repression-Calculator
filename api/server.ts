#!/usr/bin/env DENO_DIR=/tmp deno run --allow-net --allow-env --allow-read

// 改用 esm.sh CDN 导入
import { Hono } from 'https://esm.sh/hono@4.4.3'
import { cors } from 'https://esm.sh/hono@4.4.3/cors'
import { z } from 'https://esm.sh/zod@3.23.8'
import { zValidator } from 'https://esm.sh/@hono/zod-validator@0.2.1'

const app = new Hono()

app.use('*', cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (c) => c.text(`✅ Deno Edge Function is running! v${Deno.version.deno}`))

app.post('/api/echo', zValidator('json', z.object({ name: z.string() })), (c) => {
    const { name } = c.req.valid('json')
    return c.json({ message: `Hello, ${name}!`, time: new Date().toISOString() })
})

app.get('/api/env', (c) => {
    const secret = Deno.env.get('MY_SECRET') ?? '(not set)'
    return c.json({ env: secret })
})

export default app
