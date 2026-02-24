import * as z from "zod";
import { zfd } from "zod-form-data";
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export const changeOrderParams = z.array(
  z.object({
    bannerId: z.number(),
    order: z.number(),
  })
);

export const bannerCreateParams = z.object({
  title: z.string().min(3, "제목을 3글자 이상 입력해주세요."),
  imageFile: z
    .instanceof(File, { message: "이미지를 첨부해주세요." })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "이미지 크기는 20MB 이하여야 합니다.",
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
