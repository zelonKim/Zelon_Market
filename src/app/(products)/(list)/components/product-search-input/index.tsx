import { type HTMLAttributes, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useProductsSearchParams } from '@/app/(products)/(list)/hooks/use-products-search-params'
import { debounce } from 'lodash'

export function ProductSearchInput({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { term, handleTermChange } = useProductsSearchParams()

  const DebHandleTermChange = useCallback(
    // debounce를 통해 검색어 입력이 연속적으로 발생하더라도 일정 시간(10ms)동안 추가 호출을 무시함으로써 실시간 검색 기능을 최적화함.
    debounce((value: string) => handleTermChange(value), 10),
    [handleTermChange]
  )

  return (
    <main className={cn('relative', className)} {...props}>
      <Input
        value={term}
        onChange={(e) => {
          const value = e.target.value
          DebHandleTermChange(value)
        }}
        className={
          'border-2 border-blue-400 shadow-md shadow-blue-100 h-12 pl-12 mb-14 text-base focus:bg-blue-50'
        }
        placeholder={'찾고 싶은 상품을 검색해보세요.'}
      />
      <SearchIcon className={'absolute left-3 top-1/2 -translate-y-1/2'} />
    </main>
  )
}
