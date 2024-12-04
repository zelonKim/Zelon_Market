import { type HTMLAttributes } from 'react'
import { ProductListItem } from '@/schemas/product'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/rating-stars'
import Link from 'next/link'

export interface ProductCardProps {
  product: ProductListItem
}

export function ProductCard({
  className,
  product,
  ...props
}: ProductCardProps & HTMLAttributes<HTMLDivElement>) {
  const {
    id,
    price,
    rating,
    tags,
    stock,
    title,
    thumbnail,
    discountPercentage,
  } = product

  const discountedPrice = (price - price * discountPercentage * 0.01).toFixed(2)

  return (
    <main className={cn(className)} {...props}>
      <figure className={'relative w-full mb-8'}>
        <Link
          href={`/${id}`}
          className={
            'mb-5 inline-block w-full overflow-hidden rounded-3xl border-blue-200 border-2 shadow-md shadow-blue-100'
          }
        >
          <Image
            className={'w-full transition-transform hover:scale-110'}
            width={600}
            height={600}
            src={thumbnail}
            key={id}
            alt={title}
          />
        </Link>
        <figcaption className={'-mt-2 space-y-1'}>
          <div className="absolute left-64 sm:left-96 md:left-52 lg:left-24 xl:left-40 top-5 font-bold text-red-500">
            <Badge variant={'destructive'}>sale -{discountPercentage} %</Badge>
          </div>

          <div className={'flex flex-wrap items-center gap-1'}>
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h3 className={'text-xl'}>{title}</h3>
          <div className={'flex items-center gap-4'}>
            <p className="text-gray-600 italic text-md font-semibold line-through">
              {price} $
            </p>

            <p className="-ml-1 text-red-500 italic text-lg font-semibold ">
              {' '}
              {discountedPrice} $
            </p>
          </div>
          <p className={' text-red-500 text-sm'}> {stock} 개 남음</p>
          <div className="flex flex-items-end gap-2 text-sm">
            <RatingStars rating={rating} /> ({rating})
          </div>
        </figcaption>
      </figure>
    </main>
  )
}
