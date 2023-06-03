// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {head: {}},
    imports: {
        dirs: ["store"],
    },
    image: {
        strapi: {
            baseURL: "http://localhost:1337/uploads/",
        },
        cloudinary: {
            baseURL: "https://res.cloudinary.com/devqrrkig/image/fetch/",
        },
    },
    css: ["@/assets/styles/main.less", "sweetalert2/dist/sweetalert2.min.css", "vue-select/dist/vue-select.css"],
    modules: [
        ["nuxt-icon"],
        ["@vueuse/nuxt"],
        ["@nuxt/image-edge"],
        [
            "@pinia/nuxt",
            {
                autoImports: [
                    'storeToRefs',
                    // automatically imports `defineStore`
                    "defineStore", // import { defineStore } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
    ],
    runtimeConfig: {
        Production: process.env.STRAPI_URL??false,
        public: {
            strapi: {
                url: process.env.STRAPI_URL || "http://localhost:1337",
                key: process.env.API_KEY,
            },
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import "@/assets/styles/_var.less" ;@import "@/assets/styles/_mixins.less" ;`,
                },
            },
        },
    },
});
