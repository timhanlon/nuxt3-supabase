import { createApp, useCookies, useBody, App } from 'h3';
import { createClient, SupabaseClientOptions } from '@supabase/supabase-js';

export type Options = {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions?: SupabaseClientOptions;
};

export const authHandler = (options: Options): App => {
  const app = createApp();
  const { supabaseKey, supabaseUrl, supabaseOptions } = options;

  const supabase = createClient(supabaseUrl, supabaseKey, supabaseOptions);

  app.use('/set-auth-cookie', async (req, res) => {
    const body = await useBody(req);

    // @ts-expect-error: Missing properties in h3
    req.body = body;
    // @ts-expect-error: Missing properties in h3
    req.cookies = useCookies(req);
    // @ts-expect-error: Missing properties in h3
    res.status = (p) => ({ json: (p) => ({}) });

    supabase.auth.api.setAuthCookie(req, res);

    // @ts-expect-error: Missing properties in h3
    delete req.body;
    // @ts-expect-error: Missing properties in h3
    delete req.cookies;
    // @ts-expect-error: Missing properties in h3
    delete req.status;

    return 'auth cookie set';
  });

  return app;
};
