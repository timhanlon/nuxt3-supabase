// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: resolved with Nuxt
import { defineNuxtPlugin } from '#app';
import type { NuxtApp } from 'nuxt3';
import { createClient } from '@supabase/supabase-js';
import type { Options } from './auth';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: resolved with Nuxt
import optionsLoader from '#build/supabase.options.mjs';

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  const loadedOptions = (await optionsLoader()) as Options;
  const { supabaseKey, supabaseUrl, supabaseOptions } = loadedOptions;

  const supabase = createClient(supabaseUrl, supabaseKey, supabaseOptions);

  nuxtApp.app.provide('supabase', supabase);
  nuxtApp.provide('supabase', supabase);
});
