'use client'

import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SplitEntry } from '@/components/sections/SplitEntry'
import { HeroInstitution } from '@/components/sections/HeroInstitution'
import { HeroStudent } from '@/components/sections/HeroStudent'
import { ProblemInstitution } from '@/components/sections/ProblemInstitution'
import { ProblemStudent } from '@/components/sections/ProblemStudent'
import { SolutionInstitution } from '@/components/sections/SolutionInstitution'
import { SolutionStudent } from '@/components/sections/SolutionStudent'
import { ValueBlocks } from '@/components/sections/ValueBlocks'
import { CTAInstitution } from '@/components/sections/CTAInstitution'
import { CTAStudent } from '@/components/sections/CTAStudent'

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
          <SolutionInstitution />
          <ValueBlocks />
          <CTAInstitution />
          <Footer />
        </>
      )}
      {role === 'student' && (
        <>
          <HeroStudent />
          <ProblemStudent />
          <SolutionStudent />
          <CTAStudent />
          <Footer />
        </>
      )}
      {!role && <SplitEntry />}
    </>
  )
}
