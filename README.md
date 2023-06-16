# swml

## Getting Started

```typescript
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Context, Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";
import { SwmlBuilder } from 'https://deno.land/x/swml@v1.0.0/mod.ts';

const app = new Hono();

const swml = new SwmlBuilder();

app.post("/swml", async (c: Context) => {
  const data = await c.req.json();
  console.log(data);

  swml.play({
    url: "https://example.com/music.mp3",
  })

  return c.json(swml.get());
});


serve(app.fetch, { port: 8000 });
```