import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Anton } from 'next/font/google'
import { PropsWithChildren, Suspense } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

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
        <Link href={'/products'} className={'my-10 flex justify-center gap-2'}>
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
      <Suspense>
        <main className={'container pb-20'}>{children}</main>
      </Suspense>
    </>
  )
}
