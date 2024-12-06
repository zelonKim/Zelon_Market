import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Anton } from 'next/font/google'
import { PropsWithChildren, Suspense } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { UserPlusIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: '젤론 마켓',
  description: '젤론 마켓에 오신것을 환영합니다.',
}
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
})
export default function ProductLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <Link href={'/'} className={'my-10 flex justify-center gap-2'}>
          <Image
            className="rounded-2xl mr-2 -mt-1"
            src={'/market.png'}
            alt={'market'}
            width={50}
            height={50}
          />
          <h1
            className={cn(anton.className, 'text-4xl text-blue-500 font-bold')}
          >
            Zelon Market
          </h1>
        </Link>
      </header>
      <Link
        href={'/'}
        className="absolute left-[50px] sm:left-[60px] md:left-[80px] lg:left-[80px] xl:left-[140px] top-[98px]  font-semibold text-blue-600 text-[15px]"
      >
        <UserGroupIcon className="h-[26px] mx-2 px-1 rounded-full hover:bg-blue-100 " />
        <button>회원가입</button>
      </Link>
      <Link
        href={'/login'}
        className="absolute left-[120px] sm:left-[130px] md:left-[150px]  lg:left-[150px] xl:left-[210px] top-[98px]  font-semibold text-blue-600 text-[15px]"
      >
        <UserCircleIcon className="h-[26px] mx-1 px-1 rounded-full hover:bg-blue-100 " />
        <button>로그인</button>
      </Link>
      <Link
        href={'/cart'}
        className="absolute left-[330px] sm:left-[480px] md:left-[630px] lg:left-[850px] xl:left-[1210px] top-[98px]  font-semibold text-blue-600 text-[15px]"
      >
        <ShoppingCartIcon className="h-[26px] mx-2 px-1 rounded-full hover:bg-blue-100 " />
        <button>장바구니</button>
      </Link>
      <Link
        href={`/`}
        className="absolute left-[400px] sm:left-[550px] md:left-[700px] lg:left-[920px] xl:left-[1280px] top-[98px] font-semibold text-blue-600 text-[15px]"
      >
        <ShoppingBagIcon className="h-[26px] mx-2 px-1 rounded-full hover:bg-blue-100" />
        <button>구매내역</button>
      </Link>
      <Suspense>
        <main className={'container pb-20'}>{children}</main>
      </Suspense>
    </>
  )
}
