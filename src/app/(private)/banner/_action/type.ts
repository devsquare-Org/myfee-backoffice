import * as z from "zod";

export type BannerListResponse = {
  bannerId: number;
  order: number;
  title: string;
  linkUrl: string;
  bannerImageUrl: string;
  createDt: string;
  lastUpdater: string;
  lastUpdateDt: string;
}[];

export const bannerDetailResponse = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  linkUrl: z.string(),
  order: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
