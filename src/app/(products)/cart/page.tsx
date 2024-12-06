'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  return (
    <>
      <div className="mt-20 shadow-xl p-10  flex border-2 shadow-blue-100 border-blue-300 ">
        장바구니에 담긴 상품이 없습니다.
      </div>
      <Link href={`/`}>
        <button className="bg-neutral-50 py-2 px-3 rounded-2xl font-semibold shadow-lg absolute mt-6 ml-52 sm:ml-[400px] md:ml-[510px] lg:px-4 lg:ml-[720px] text-sm hover:ring-2 lg:text-lg xl:ml-[980px] hover:bg-white text-black/80">
          이전으로
        </button>
      </Link>
      <button
        className="bg-gray-300 py-2 px-3 rounded-2xl font-semibold shadow-lg mt-6 ml-[300px] text-sm 
      sm:ml-[490px] md:ml-[610px]  lg:px-4 lg:ml-[840px] lg:text-lg xl:ml-[1100px] hover:ring-2 ring-gray-500 hover:bg-gray-400 text-black/80 "
      >
        결제하기
      </button>
    </>
  )
}
