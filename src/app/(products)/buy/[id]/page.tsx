'use client'
import { use, useCallback, useEffect, useState } from 'react'
import { ProductDetailPageProps } from '../../[id]/page'
import { useProduct } from '../../[id]/hooks/use-product'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function BuyPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)

  const searchParams = useSearchParams()
  const amount = searchParams.get('amount')

  const [amountSt, setAmountSt] = useState('')

  useEffect(() => {
    if (typeof amount === 'string') {
      setAmountSt(amount)
    }
  }, [amount])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountSt(e.target.value)
  }, [])

  const { data, isLoading, error } = useProduct(id)

  if (isLoading) {
    return <div>해당 상품을 불러오는 중...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  const totalPrice = Number((Number(amountSt) * data!.price).toFixed(2))

  const discountedPrice = (
    totalPrice -
    totalPrice * data!.discountPercentage * 0.01
  ).toFixed(2)

  return (
    <>
      <div className="flex shadow-lg border-2 shadow-blue-100 border-blue-300 p-1">
        <Image
          className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl"
          width={100}
          height={100}
          src={data!.thumbnail}
          key={id}
          alt={data!.title}
        />
        <div className="mt-10 ml-1 font-semibold text-lg w-80 ">
          {data!.title}
        </div>

        <div className="w-72 -ml-1 mt-10 sm:ml-32 md:ml-40 lg:ml-[330px] xl:ml-[580px] 2xl:ml-[1000px] text-sm lg:text-lg h-8 ">
          <input
            className="focus:outline-blue-400 w-12 md:w-14 lg:w-16 xl:w-18 2xl:w-20 h-8 ml-2 text-center rounded-sm"
            type="number"
            value={amountSt}
            onChange={handleChange}
            min={1}
          ></input>
          <span>개 * {data!.price} =</span>
        </div>
        <div className="text-black/80 font-semibold -ml-3 mt-10 italic text-sm lg:text-lg line-through ">
          {totalPrice}$
        </div>
        <div className=" text-red-500 mt-10 ml-3 font-semibold text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl italic mr-2">
          {discountedPrice}$
        </div>
      </div>
      <Link href={`/${id}`}>
        <button className="bg-neutral-50 py-2 px-3 rounded-2xl font-semibold shadow-lg absolute mt-6 ml-52 sm:ml-[400px] md:ml-[510px] lg:px-4 lg:ml-[720px] text-sm hover:ring-2 lg:text-lg xl:ml-[980px] hover:bg-white text-black/80">
          이전으로
        </button>
      </Link>
      <button
        className="bg-blue-200 py-2 px-3 rounded-2xl font-semibold shadow-lg mt-6 ml-[300px] text-sm 
      sm:ml-[490px] md:ml-[610px]  lg:px-4 lg:ml-[840px] lg:text-lg xl:ml-[1100px] hover:ring-2 hover:bg-blue-300 text-black/80"
      >
        결제하기
      </button>
    </>
  )
}
