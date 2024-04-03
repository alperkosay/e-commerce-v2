declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_STRAPI_TOKEN: string;
    NEXT_PUBLIC_STRAPI_BASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    ANONYM_SESSION_SECRET: string;
  }
}
