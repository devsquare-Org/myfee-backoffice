"use server";

import {
  bannerCreateParams,
  bannerUpdateParams,
  changeOrderParams,
  deleteBannerParams,
} from "@/app/(private)/banner/_action/schema";
import { myfeePost, myfeePostFormData } from "@/lib/myfee-client";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";

export const changeOrderAction = actionClient
  .inputSchema(changeOrderParams)
  .action(async ({ parsedInput }) => {
    await myfeePost({
      endpoint: "/api/admin/banners/sort-order",
      body: {
        sortOrders: parsedInput,
      },
      requiresAuth: true,
    });

    return { message: "배너 순서를 변경했습니다." };
  });

export const bannerCreateAction = actionClient
  .inputSchema(bannerCreateParams)
  .action(async ({ parsedInput }) => {
    const formData = new FormData();
    formData.append("title", parsedInput.title);
    formData.append("linkUrl", parsedInput.linkUrl);
    formData.append("bannerImageFile", parsedInput.imageFile);

    await myfeePostFormData({
      endpoint: "/api/admin/banners",
      body: formData,
      requiresAuth: true,
    });
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
