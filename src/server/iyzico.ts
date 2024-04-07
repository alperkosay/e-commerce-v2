import { env } from "@/env";
import Iyzipay from "iyzipay";

export const iyzipay = new Iyzipay({
  apiKey: env.IYZICO_API_KEY,
  secretKey: env.IYZICO_SECRET_KEY,
  uri: "https://sandbox-api.iyzipay.com",
});
