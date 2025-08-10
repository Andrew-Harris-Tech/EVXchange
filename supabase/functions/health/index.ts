// supabase/functions/health/index.ts
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

serve((_req: Request) =>
  new Response(
    JSON.stringify({ status: "healthy", message: "ChargeBnB API is running" }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    }
  )
);