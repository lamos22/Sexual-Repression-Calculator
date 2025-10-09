#!/usr/bin/env DENO_DIR=/tmp deno run --allow-net --allow-read --allow-env
import app from "../src/server/app.prod.ts";

export default app.fetch;
