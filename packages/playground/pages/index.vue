<script setup lang="ts">
import { useOnAuthStateChange, useSupabase, getSession } from 'nuxt3-supabase';

const supabase = useSupabase();

useOnAuthStateChange();

const nuxtApp = useNuxtApp();

const { data } = await useAsyncData(
  'user',
  () => getSession(nuxtApp.ssrContext),
  {
    server: true
  }
);
</script>

<template>
  <div>
    <button
      @click="
        supabase.auth.signIn({
          email: 'sorianorobertc@gmail.com'
        })
      "
    >
      Sign in
    </button>
    <button @click="supabase.auth.signOut()">Sign out</button>
    <div>{{ data }}</div>
  </div>
</template>
