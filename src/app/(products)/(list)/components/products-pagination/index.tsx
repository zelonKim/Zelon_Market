import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { useProductsSearchParams } from '@/app/(products)/(list)/hooks/use-products-search-params'

export interface ProductsPaginationProps {
  totalPage: number
  displayPage?: number
}

export function ProductsPagination({
  className,
  totalPage,
  ...props
}: ProductsPaginationProps & HTMLAttributes<HTMLDivElement>) {
  const { page, setPage } = useProductsSearchParams()

  const handlePrevious = async () => {
    if (page === 1) {
      return
    }
    await setPage(Math.max(page - 1, 1))
  }

  const handleNext = async () => {
    if (page === totalPage) {
      return
    }
    await setPage(Math.min(page + 1, totalPage))
  }

  const displayPage = 5

  const startPage = Math.max(
    1,
    Math.floor((page - 1) / displayPage) * displayPage + 1
  )

  const endPage = Math.min(startPage + displayPage - 1, totalPage)
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  return (
    <main className={cn(className)} {...props}>
      <Pagination aria-label="Pagination">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page === 1}
              onClick={handlePrevious}
              className={cn('cursor-pointer', {
                'cursor-not-allowed': page === 1,
              })}
            />
          </PaginationItem>

          {pages.map((i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setPage(i)}
                aria-current={i === page}
                className={cn('cursor-pointer', { 'font-bold': i === page })}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              aria-disabled={page === 1}
              onClick={handleNext}
              className={cn('cursor-pointer', {
                'cursor-not-allowed': page === totalPage,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  )
}
