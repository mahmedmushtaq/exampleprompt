interface IConfig {
  env: "dev" | "prod";
  hostName: string;
  googleAnalyticId?: string;
}

const configObj = {
  default: {
    hostName: "http://localhost:3000",
  },
  dev: {
    env: "dev",
  },
  prod: {
    env: "prod",
    hostName: "https://www.exampleprompts.com",
    googleAnalyticId: "G-KKD0B6Y47Y",
  },
};

const env = process.env.NEXT_PUBLIC_VERCEL_ENV || "development";

const devData = env === "development" || env === "preview" ? configObj.dev : {};
const prodData = env === "production" ? configObj.prod : {};

//@ts-ignore
const config: IConfig = { ...configObj.default, ...devData, ...prodData };

export default config;
