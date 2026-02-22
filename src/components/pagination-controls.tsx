'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface PaginationControlsProps {
  pageSize: number;
  totalItems: number;
  searchParams?: Record<string, string | undefined>;
}

export function PaginationControls({
  pageSize,
  totalItems,
  searchParams = {},
}: PaginationControlsProps) {
  const searchParamsObj = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParamsObj.get('page') ?? '0');

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  );

  function handlePageChange(pageNum: number) {
    if (pageNum < 0 || pageNum >= totalPages || pageNum === page) {
      return;
    }

    const params = new URLSearchParams(searchParamsObj);

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page' && key !== 'pageSize') {
        params.set(key, value);
      }
    });

    params.set('page', pageNum.toString());

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='mt-4'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 0 && handlePageChange(page - 1)}
              className={
                page <= 0
                  ? 'pointer-events-none opacity-50 hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
                  : 'cursor-pointer hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
              }
            />
          </PaginationItem>

          {Array.from(
            { length: Math.min(5, Math.max(1, totalPages)) },
            (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i;
              } else if (page <= 2) {
                pageNumber = i;
              } else if (page >= totalPages - 3) {
                pageNumber = totalPages - 5 + i;
              } else {
                pageNumber = page - 2 + i;
              }

              if (totalPages === 0 && pageNumber > 0) {
                return null;
              }

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={pageNumber === page}
                    className='cursor-pointer hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
                  >
                    {pageNumber + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages - 1 && handlePageChange(page + 1)}
              className={
                page >= totalPages - 1
                  ? 'pointer-events-none opacity-50 hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
                  : 'cursor-pointer hover:bg-transparent md:hover:bg-secondary active:bg-secondary'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
