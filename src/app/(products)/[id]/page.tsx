'use client'

import { use, useCallback, useState } from 'react'
import { useProduct } from '@/app/(products)/[id]/hooks/use-product'
import Image from 'next/image'
import { RatingStars } from '@/components/rating-stars'
import { useRouter } from 'next/navigation'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [amount, setAmount] = useState('')

  const router = useRouter()

  const onChangeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value)
    },
    []
  )

  const onClickBuy = () => {
    if (amount >= '1') {
      router.push(`/buy/${id}?amount=${amount}`)
    } else {
      alert('구매할 개수를 선택해주세요')
    }
  }

  const onClickCart = () => {
    if (amount >= '1') {
      confirm('장바구니에 담겼습니다. 해당 페이지로 이동하시겠습니까?')
    } else {
      alert('장바구니에 담을 개수를 선택해주세요')
    }
  }

  const { id } = use(params)

  const { data, isLoading, error } = useProduct(id)

  if (isLoading) {
    return <div>해당 상품을 불러오는 중...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  const discountedPrice = (
    data!.price -
    data!.price * data!.discountPercentage * 0.01
  ).toFixed(2)

  return (
    <>
      <div className="mt-[80px] flex flex-row justify-center">
        <Image
          className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl"
          width={600}
          height={600}
          src={data!.thumbnail}
          key={id}
          alt={data!.title}
        />

        <div className="flex flex-col ml-14">
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data!.title}
          </div>
          <div className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
            {data!.brand}
          </div>
          <div className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl mt-8">
            {data!.description}
          </div>

          <div className="text-sm lg:text-md xl:text-lg 2xl:text-xl mt-10 justify-end">
            <div>배송 기간: {data!.shippingInformation}</div>
            <div>보증 기간: {data!.warrantyInformation}</div>
            <div>반품 기간: {data!.returnPolicy}</div>
          </div>
          <div className="text-sm lg:text-md xl:text-lg 2xl:text-xl mt-8">
            <div>무게: {data!.weight} oz</div>
            <div>너비: {data!.dimensions.width} mm</div>
            <div>높이: {data!.dimensions.height} mm</div>
            <div>두께: {data!.dimensions.depth} mm</div>
          </div>

          <div className="flex justify-end mt-14 text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl ">
            <div className="text-sm md:text-md lg:text-lg 2xl:text-xl">
              개수:
            </div>
            <input
              className="focus:outline-blue-400 w-12 md:w-14 lg:w-16 xl:w-18 2xl:w-20 h-8 ml-2 text-center rounded-sm"
              type="number"
              placeholder="1"
              onChange={onChangeAmount}
              min="1"
            ></input>

            <button
              onClick={onClickCart}
              className="bg-white hover:ring ring-blue-400/80 font-semibold  text-sm w-20 sm:w-24  md:w-28 md:text-md lg:w-32 lg:text-lg xl:w-36 xl:text-xl 2xl:w-40 2xl:text-2xl  ml-14 p-3 shadow-md rounded-xl"
            >
              장바구니
            </button>

            <button
              onClick={onClickBuy}
              className="hover:ring ring-blue-400 bg-blue-300 font-semibold text-sm w-20 sm:w-24 md:w-28 md:text-md lg:w-32 lg:text-lg xl:w-36 xl:text-xl 2xl:w-40 2xl:text-2xl ml-10 p-3 shadow-md rounded-xl"
            >
              구매하기
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="text-gray-600 italic text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold line-through">
            {data!.price}$
          </div>
          <div className=" text-red-500 font-semibold text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl italic">
            {discountedPrice}$
          </div>
          <div className=" text-red-500 text-right text-sm lg:text-lg mt-8">
            {data!.stock} 개 <br />
            남음
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className=" bg-blue-300/60 h-0.5  rounded-2xl mb-20 "> </div>

        <div className="font-semibold text-md lg:text-lg xl:text-xl 2xl:text-2xl -mb-6">
          구매자 리뷰
        </div>
        {data!.reviews?.map((review, index) => (
          <div key={index} className=" flex flex-col gap-1">
            <RatingStars
              rating={review.rating}
              className="animate-bounce mt-14 w-20 md:w-24 lg:w-28 xl:w-32 xl:mb-1 2xl:w-36 2xl:mb-2"
            />
            <div className="bg-white shadow-md rounded-sm p-4 lg:p-5 xl:p-6 w-72 sm:w-[340px] md:w-[380px] lg:w-[420px] xl:w-[460px] 2xl:w-[500px]">
              <div className="font-bold text-md mb-1 lg:text-lg xl:text-xl 2xl:text-2xl">
                {review.comment}
              </div>
              <a
                href={`mailto:${review.reviewerEmail}`}
                className="text-sm lg:text-md xl:text-lg 2xl:text-xl ml-1"
              >
                by {review.reviewerName}
              </a>
              <div className="text-sm xl:text-md  ml-1">
                작성일시: {review.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
