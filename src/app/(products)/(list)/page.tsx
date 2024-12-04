'use client'

import { ProductSearchInput } from '@/app/(products)/(list)/components/product-search-input'
import { Suspense } from 'react'
import { ProductList } from '@/app/(products)/(list)/components/product-list'

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductSearchInput className={'my-8'} />
      <ProductList />
    </Suspense>
  )
}
