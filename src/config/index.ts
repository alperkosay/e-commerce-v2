function env(processENV: string | undefined, defaultValue: string) {
    return processENV || defaultValue
}
const config = {
    strapiURL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
}

export default config