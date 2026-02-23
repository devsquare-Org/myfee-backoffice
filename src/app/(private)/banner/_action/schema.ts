import * as z from "zod";
import { zfd } from "zod-form-data";

export const changeOrderParams = z.array(
  z.object({
    id: z.string(),
    order: z.number(),
  })
);

export const bannerCreateParams = zfd.formData({
  title: z.string().min(3, "제목을 3글자 이상 입력해주세요."),
  imageFile: zfd
    .file()
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "이미지 크기는 5MB 이하여야 합니다.",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "이미지 파일만 업로드 가능합니다.",
    }),
  linkUrl: z.url({ message: "링크를 정확하게 입력해주세요." }),
});

export const getBannerDetailParams = z.object({
  id: z.string(),
});

export const bannerUpdateParams = zfd.formData({
  id: z.string(),
  title: z.string().min(3, "제목을 3글자 이상 입력해주세요."),
  imageFile: zfd
    .file()
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "이미지 크기는 5MB 이하여야 합니다.",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "이미지 파일만 업로드 가능합니다.",
    }),
  linkUrl: z.url({ message: "링크를 정확하게 입력해주세요." }),
});

export const deleteBannerParams = z.object({
  id: z.string(),
});
