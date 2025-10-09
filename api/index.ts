#!/usr/bin/env deno run --config tsconfig.vercel.json
import app from '../src/server/app.vercel.ts';

export default app.fetch;
