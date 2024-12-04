import { useQuery } from '@tanstack/react-query'
import { getProduct } from '@/actions/get-product'

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await getProduct(id)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return res.data
    },
  })
}
