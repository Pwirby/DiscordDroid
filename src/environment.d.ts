declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DISCORD_TOKEN: string;
      GUILD_ID: string;
      CLIENT_ID: string;
    }
  }
}
export {};
