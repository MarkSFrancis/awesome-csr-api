declare namespace NodeJS {
  interface ProcessEnv extends IProcessEnv {
    NODE_ENV: string;
    APP_NAME: string;
  }
}
