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

export type BannerDetailResponse = {
  bannerId: number;
  order: number;
  title: string;
  linkUrl: string;
  bannerImageUrl: string;
  createDt: string;
  lastUpdater: string;
  lastUpdateDt: string;
};
