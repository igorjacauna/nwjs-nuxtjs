export default {
    srcDir: 'app',
    ssr: false,
    target: 'static',
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'
    ],
    buildModules: [
        '@nuxtjs/vuetify'
    ],
    css: [
        '@/assets/main.scss'
    ]
}