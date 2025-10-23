export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  css: [
    'sweetalert2/dist/sweetalert2.min.css', 
    // ... ไฟล์ CSS อื่นๆ ของคุณ
  ],
  app: {
    head: {
      title:
        "CtK@HospitaL",
    },
  },
  runtimeConfig:{
    public:{
      ClientId: process.env.CLIENT_ID,
      SecretId: process.env.CLIENT_SECRET,
      ClientId1: process.env.CLIENT_ID1,
      SecretId1: process.env.CLIENT_SECRET1,
      ApiUrl: process.env.API_URL,

    }  
  },
  modules:[
    '@pinia/nuxt',
  ],
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    serveStatic: true,
  },
  sourcemap: { server: false, client: false },
  devServerHandlers: [],
  compatibilityDate: "2025-04-04",

});