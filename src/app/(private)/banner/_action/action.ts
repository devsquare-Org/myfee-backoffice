"use server";

import {
  bannerCreateParams,
  bannerUpdateParams,
  changeOrderParams,
  deleteBannerParams,
} from "@/app/(private)/banner/_action/req-schema";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";

export const changeOrderAction = actionClient
  .inputSchema(changeOrderParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: "배너 순서를 변경했습니다." };
  });

export const bannerCreateAction = actionClient
  .inputSchema(bannerCreateParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: "배너를 생성했습니다." };
  });

export const bannerUpdateAction = actionClient
  .inputSchema(bannerUpdateParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { message: "배너를 수정했습니다." };
  });

export const deleteBannerAction = actionClient
  .inputSchema(deleteBannerParams)
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redirect("/banner");
  });
