import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/actions/get-products'
import { useProductsSearchParams } from '@/app/(products)/(list)/hooks/use-products-search-params'

export const useProducts = () => {
  const { page, term } = useProductsSearchParams()
  const props = {
    limit: 24,
    skip: 24 * (page - 1),
    q: term ?? '',
  }
  return useQuery({
    queryKey: ['products', { ...props }],
    queryFn: async () => {
      const res = await getProducts(props)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return {
        ...res.data,
        totalPage: Math.floor(res.data.total / 24) + 1,
      }
    },
  })
}
