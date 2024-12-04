import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/app/(products)/(list)/components/product-card'
import { useProducts } from '@/app/(products)/(list)/hooks/use-products'
import { ProductsPagination } from '@/app/(products)/(list)/components/products-pagination'

export function ProductList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { data, isLoading, isError, error } = useProducts()

  if (isLoading) {
    return <div>상품들을 불러오는 중...</div>
  }
  if (isError) {
    throw new Error(error.message)
  }

  if (!data) {
    return <div>No products found</div>
  }

  return (
    <div className={className} {...props}>
      <main
        className={cn(
          'grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4'
        )}
      >
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
      <ProductsPagination totalPage={data.totalPage} className={'mt-10'} />
    </div>
  )
}
