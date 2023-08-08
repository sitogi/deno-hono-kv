import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'

const app = new Hono()
const kv = await Deno.openKv();

app.get('/', async (c) => {
  const res = await kv.get(['users', 'alice'])
  console.log(res.key);
  console.log(res.value);

  return c.json(res.value);
});

Deno.serve(app.fetch)
