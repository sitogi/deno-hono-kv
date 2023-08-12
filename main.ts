import { Hono } from 'https://deno.land/x/hono@v3.3.1/mod.ts'

const app = new Hono()
const kv = await Deno.openKv();

app.get('/users', async (c) => {
  const list = kv.list({ prefix: ["users"] });
  console.log(list);
  for await (const entry of list) {
    console.log(entry.key);
    console.log(entry.value);
  }

  return c.json({});
});

app.get('/', async (c) => {
  const res = await kv.get(['users', 'takano'])
  console.log(res.key);
  console.log(res.value);

  return c.json(res.value);
});

app.post('/user', async (c) => {
  const newUserReq = await c.req.json<{ name: string }>();
  console.log(newUserReq);
  await kv.set(['users', newUserReq.name], newUserReq);
  return c.text('Created!', 201);
});

Deno.serve(app.fetch)
