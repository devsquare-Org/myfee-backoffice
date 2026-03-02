import BannerList from "./banner-list";
import { fetchBannerList } from "@/app/(private)/banner/_action/data";

export async function BannerListWithData() {
  const { data } = await fetchBannerList();

  return <BannerList bannerList={data} />;
}
