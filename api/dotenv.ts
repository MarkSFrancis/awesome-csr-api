import dotenv from "dotenv";
const curEnv = process.env.APP_MODE || "development";

const dotenvFiles = [
  `.env.${curEnv}.local`,
  `.env.${curEnv}`,
  ".env.local",
  ".env",
];

dotenv.config({
  path: dotenvFiles,
});
