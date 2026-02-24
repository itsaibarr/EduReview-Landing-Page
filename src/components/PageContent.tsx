'use client'

import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { SplitEntry } from '@/components/sections/SplitEntry'
import { HeroInstitution } from '@/components/sections/HeroInstitution'
import { HeroStudent } from '@/components/sections/HeroStudent'

export function PageContent() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  return (
    <>
      <Navbar />
      {role === 'institution' && <HeroInstitution />}
      {role === 'student'     && <HeroStudent />}
      {!role                  && <SplitEntry />}
    </>
  )
}
