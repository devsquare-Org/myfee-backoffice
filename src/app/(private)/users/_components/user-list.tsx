import { UserListResponse } from '@/app/(private)/users/_action/type';
import { PaginationControls } from '@/components/pagination-controls';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ROUTES } from '@/lib/routes-config';

type Props = {
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  userListData: UserListResponse;
  isPaging?: boolean;
};

export function UserList({
  userListData,
  search,
  startDate,
  endDate,
  isPaging,
}: Props) {
  const { contents, totalElements, totalPages, size } = userListData;
  return (
    <>
      <Table className='text-xs'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>프로필</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>닉네임</TableHead>
            <TableHead>생년월일</TableHead>
            <TableHead>전화번호</TableHead>
            <TableHead>성별</TableHead>
            <TableHead>포인트</TableHead>
            <TableHead>팔로워</TableHead>
            <TableHead>팔로잉</TableHead>
            <TableHead>게시물</TableHead>
            <TableHead>가입일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.map((user) => (
            <TableRow key={user.id} url={`${ROUTES.USERS}/${user.id}`}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.profileImageUrl ?? ""} />
                  <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.alias}</TableCell>
              <TableCell>{user.birth}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.pointBalance.toLocaleString()}</TableCell>
              <TableCell>{user.totalFollower.toLocaleString()}</TableCell>
              <TableCell>{user.totalFollowing.toLocaleString()}</TableCell>
              <TableCell>{user.totalFeed.toLocaleString()}</TableCell>
              <TableCell>{user.joinDt.split("T")[0]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {contents.length > 0 && totalPages > 1 && isPaging && (
        <PaginationControls
          pageSize={size}
          totalItems={totalElements}
          searchParams={{ search, startDate, endDate }}
        />
      )}
    </>
  );
}
