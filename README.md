# nuxt3-supabase

Nuxt 3 module and composables for Supabase.

## Installation

```bash
$ yarn add nuxt3-supabase
# or
$ npm install --save nuxt3-supabase
```

## Getting Started

Add the following to your `nuxt.config.ts` file.

```js
export default defineNuxtConfig({
  modules: ['nuxt3-supabase/module'],
  supabase: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY
  },
  vite: false // temporary fix: follow this https://github.com/nuxt/framework/issues/1097
});
```

## Usage

```html
<script setup>
  const { $supabase } = useNuxtApp();

  const { data, pending } = await useAsyncData('posts', () => {
    return $supabase.from('posts').select();
  });
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else>{{ data }}</div>
</template>
```

## Composables

### useSupabase

Supabase client composable.

```ts
import { useSupabase } from 'nuxt3-supabase';

const supabase = useSupabase();
```

### useAuth

[Supabase Auth](https://supabase.io/docs/guides/auth) composable.

```ts
import { useAuth } from 'nuxt3-supabase';

const { user, signIn, signOut } = useAuth();
```

### useStorage

[Supabase Storage](https://supabase.io/docs/guides/storage) composable.

```ts
import { useStorage } from 'nuxt3-supabase';

const storage = useStorage();
```

### useFrom

[Supabase Database](https://supabase.io/docs/guides/database) composable.

```ts
import { useFrom } from 'nuxt3-supabase';

const from = useFrom();
```

### useOnAuthStateChange

Behaves similarly to [onAuthStateChange](https://supabase.io/docs/reference/javascript/auth-onauthstatechange) but also sets/unsets auth cookie to the server.

```ts
import { useOnAuthStateChange } from 'nuxt3-supabase';

useOnAuthStateChange((event, session) => {
  console.log(event, session);
});
```

### getSession

Get the server session that was set by `useOnAuthStateChange`.

```html
<script setup>
  import { useOnAuthStateChange, getSession } from 'nuxt3-supabase';

  const nuxtApp = useNuxtApp();

  const { data } = await useAsyncData('user', () =>
    getSession(nuxtApp.ssrContext)
  );

  useOnAuthStateChange();
</script>
```

TIP: You can use `getSession` to check if a user is authenticated before route load.

### getServerSession

A helper function to get current user in API routes. This requires passing of the key and url again.

```ts
import { getServerSession } from 'nuxt3-supabase';

export default async (req, res) => {
  const user = await getServerSession(req, {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY
  });

  if (!user) {
    res.statusCode = 400;
    res.end('Unauthorized!');
  }

  return {
    user
  };
};
```

## License

MIT
