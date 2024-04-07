import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { iyzipay } from "@/server/iyzico";
import { env } from "@/env";
import crypto from "crypto";

export const iyzicoRouter = createTRPCRouter({
  checkout: publicProcedure
    .input(z.object({ object: z.any() }))
    .mutation(async ({ input }) => {
      const body = {
        locale: "TR",
        conversationId: "123456789",
        price: "549.0",
        basketId: "B67832",
        paymentGroup: "PRODUCT",
        buyer: {
          id: "BY789",
          name: "John",
          surname: "Doe",
          identityNumber: "74300864791",
          email: "email@email.com",
          gsmNumber: "+905350000000",
          registrationDate: "2013-04-21 15:12:09",
          lastLoginDate: "2015-10-05 12:43:35",
          registrationAddress:
            "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
          city: "Istanbul",
          country: "Turkey",
          zipCode: "34732",
          ip: "85.34.78.112",
        },
        shippingAddress: {
          address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
          zipCode: "34742",
          contactName: "Jane Doe",
          city: "Istanbul",
          country: "Turkey",
        },
        billingAddress: {
          address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
          zipCode: "34742",
          contactName: "Jane Doe",
          city: "Istanbul",
          country: "Turkey",
        },
        basketItems: [
          {
            id: "BI101",
            price: "549.0",
            name: "Binocular",
            category1: "Collectibles",
            category2: "Accessories",
            itemType: "PHYSICAL",
          },
        ],
        enabledInstallments: [1, 2, 3, 6, 9],
        callbackUrl: "https://www.merchant.com/callback",
        currency: "TRY",
        paidPrice: "549.0",
      };
      console.log({
        Authorization: generateAuthorizationHeader(
          HEADER_NAME,
          API_KEY,
          SEPARATOR,
          SECRET_KEY,
          JSON.stringify(body),
          generateRandomString(8),
        ),
        "x-iyzi-rnd": generateRandomString(8),
      });
      const randstr = generateRandomString(8);
      const res = await fetch(
        "https://sandbox-api.iyzipay.com/payment/iyzipos/checkoutform/initialize/auth/ecom",
        {
          method: "POST",
          headers: {
            Authorization: generateAuthorizationHeader(
              HEADER_NAME,
              API_KEY,
              SEPARATOR,
              SECRET_KEY,
              JSON.stringify(body),
              randstr,
            ),
            "x-iyzi-rnd": randstr,
          },
          body: JSON.stringify(body),
        },
      );
      console.log(res.headers);
      const data = await res.json();
      console.log(data);
    }),
});

const HEADER_NAME = "IYZWS";
const API_KEY = env.IYZICO_API_KEY;
const SEPARATOR = ":";
const SECRET_KEY = env.IYZICO_SECRET_KEY;

function generateAuthorizationHeader(
  iyziWsHeaderName: string,
  apiKey: string,
  separator: string,
  secretKey: string,
  body: string,
  randomString: string,
) {
  return (
    iyziWsHeaderName +
    " " +
    apiKey +
    separator +
    generateHash(apiKey, randomString, secretKey, body)
  );
}

function generateAuthorizationHeaderV2(
  apiKey: string,
  separator: string,
  uri: string,
  randomString: string,
  secretKey: string,
  body: string,
) {
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(randomString + uri + JSON.stringify(body))
    .digest("hex");

  var authorizationParams = [
    "apiKey" + separator + apiKey,
    "randomKey" + separator + randomString,
    "signature" + separator + signature,
  ];
  return new Buffer(authorizationParams.join("&")).toString("base64");
}

function generateHash(
  apiKey: string,
  randomString: string,
  secretKey: string,
  body: string,
) {
  var shaSum = crypto.createHash("sha1");
  shaSum.update(apiKey + randomString + secretKey + body, "utf8");
  return shaSum.digest("base64");
}

function generateRandomString(size: number) {
  return process.hrtime()[0] + Math.random().toString(size).slice(2);
}
