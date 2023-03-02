// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    runtimeConfig: {
        public:{
        backendUrl: process.env.BACKEND_URL || 'http://localhost:8000'}
      },
})
