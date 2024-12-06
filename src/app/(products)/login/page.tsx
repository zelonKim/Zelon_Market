'use client'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function CartPage() {
  return (
    <>
      <div className=" bg-blue-300/60 h-0.5  rounded-2xl mt-20 "> </div>
      <div className="flex-col mt-20 ml-6 sm:ml-24 md:ml-72 lg:ml-80 xl:ml-96">
        <input
          className="flex w-96 xl:w-[450px] font-semibold bg-white rounded-2xl shadow-md p-4 "
          placeholder="아이디 (이메일)"
        ></input>
        <input
          className="flex w-96 xl:w-[450px] font-semibold bg-white rounded-2xl mt-5 shadow-md p-4"
          placeholder="비밀번호"
        ></input>
        <div className="flex">
          <CheckCircleIcon className="ml-1 mt-2.5 w-5 hover:bg-black/10 rounded-full" />
          <div className="ml-1.5 text-[15px] mt-3">자동 로그인</div>
        </div>
        <button className="flex w-96 xl:w-[450px] justify-center bg-blue-200  p-2 mt-3 text-black/80 hover:bg-blue-300 font-semibold hover:font-bold">
          로그인
        </button>
        <button className="flex w-96 xl:w-[450px] justify-center bg-neutral-50  p-2 mt-4 text-black/80 hover:bg-white font-semibold hover:font-bold">
          회원가입
        </button>
        <button className="mt-4 ml-14 xl:ml-24 text-blue-500 text-md text-md hover:font-semibold hover:underline underline-offset-2">
          아이디 혹은 비밀번호를 잊어버리셨나요?
        </button>
      </div>
    </>
  )
}
