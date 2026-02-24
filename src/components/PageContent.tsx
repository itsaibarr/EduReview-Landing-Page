'use client'

import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { SplitEntry } from '@/components/sections/SplitEntry'
import { HeroInstitution } from '@/components/sections/HeroInstitution'
import { HeroStudent } from '@/components/sections/HeroStudent'
import { ProblemInstitution } from '@/components/sections/ProblemInstitution'
import { ProblemStudent } from '@/components/sections/ProblemStudent'

export function PageContent() {
  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  return (
    <>
      <Navbar />
      {role === 'institution' && (
        <>
          <HeroInstitution />
          <ProblemInstitution />
        </>
      )}
      {role === 'student' && (
        <>
          <HeroStudent />
          <ProblemStudent />
        </>
      )}
      {!role && <SplitEntry />}
    </>
  )
}
