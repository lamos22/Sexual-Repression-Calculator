#!/usr/bin/env deno run --config deno.json
import app from '../src/server/app.vercel.ts';

export default app.fetch;
