import { UserList } from "./user-list";
import { fetchUserList } from "@/app/(private)/users/_action/data";

type Props = {
  page: string;
  search?: string;
};

export async function UserListWithData({ page, search }: Props) {
  const { data } = await fetchUserList({ page, search: search ?? "" });

  return (
    <UserList
      userListData={data}
      search={search}
      page={Number(page)}
      isPaging={true}
    />
  );
}
