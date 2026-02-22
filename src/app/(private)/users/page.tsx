import { fetchUserList } from "@/app/(private)/users/_action/data";
import { UserList } from "@/app/(private)/users/_components/user-list";
import { PageHeader } from "@/components/page-header";
import SearchInput from "@/components/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{
    search: string;
    startDate: string;
    endDate: string;
    page: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  if (!params.page) {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const page = params.page ?? "0";
    const search = params.search ?? "";

    const queryString = new URLSearchParams();
    queryString.set("page", page);
    if (search) queryString.set("search", search);

    redirect(`/users?${queryString.toString()}`);
  }

  const { page, search } = params;
  const { data } = await fetchUserList({ page, search });

  return (
    <div>
      <PageHeader
        title="유저 목록"
        description="유저 목록을 확인할 수 있습니다."
      />
      <Suspense fallback={<Skeleton className="w-full h-10" />}>
        <SearchInput
          placeholder="닉네임 또는 전화번호로 검색"
          searchParamsName="search"
          className="mb-4 max-w-[280px]"
        />
      </Suspense>
      <UserList
        userListData={data}
        search={search}
        page={Number(page)}
        isPaging={true}
      />
    </div>
  );
}
